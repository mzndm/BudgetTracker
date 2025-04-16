import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {Category} from "../../shared/models";
import {EditCategoryComponent} from "./components/edit-category/edit-category.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../shared/components/delete-dialog/delete-dialog.component";

interface CategoryTab {
  id: number;
  name: string;
  categories$: BehaviorSubject<Category[]>;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  categoryTabs: CategoryTab[] = [
    {
      id: 0,
      name: 'Expense',
      categories$: new BehaviorSubject<Category[]>([])
    },
    {
      id: 1,
      name: 'Income',
      categories$: new BehaviorSubject<Category[]>([])
    },
    {
      id: 2,
      name: 'Transfer',
      categories$: new BehaviorSubject<Category[]>([])
    }
  ];

  allCategories$ = new BehaviorSubject<Category[]>([]);
  childrenCategories$ = new BehaviorSubject<Category[]>([]);
  parentCategories$ = new BehaviorSubject<Category[]>([]);
  activeCategory: Category | null = null;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getCategories();

    this.allCategories$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(categories => {
        const parents = categories.filter(category => category.parentCategory === null);
        this.childrenCategories$.next(categories.filter(category => category.parentCategory !== null));

        this.categoryTabs[0].categories$.next(parents.filter(category => category.type === 0));
        this.categoryTabs[1].categories$.next(parents.filter(category => category.type === 1));
        this.categoryTabs[2].categories$.next(parents.filter(category => category.type === 2));
        this.parentCategories$.next(parents);
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCategories(): void {
    this.dataService.getCategories()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(categories => this.allCategories$.next(categories))
      )
      .subscribe();
  }

  createCategory(): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '400px',
      data: {
        parentCategories: this.parentCategories$.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.createCategory(result)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.getCategories());
      } else {
        console.log('Dialog was closed without saving');
      }
    });
  }

  typeChanged(index: number): void {
    this.activeCategory = null;
  }

  selectCategory(category: Category): void {
    this.activeCategory = category;
  }

  editCategory(category: Category): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '400px',
      data: {
        parentCategories: this.parentCategories$.value,
        categoryId: category.id,
        category: {
          type: category.type,
          name: category.name,
          icon: category.icon,
          parentCategory: category.parentCategory,
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateCategory({...category, ...result})
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.getCategories());
      } else {
        console.log('Dialog was closed without saving');
      }
    });
  }

  deleteCategory(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Confirm',
        message: `Are you sure you want to delete the category?`
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.dataService.deleteCategory(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(() => this.getCategories());
      }
    });
  }

}
