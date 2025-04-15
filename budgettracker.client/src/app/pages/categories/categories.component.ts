import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {Category} from "../../shared/models";

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
  activeCategory: Category | null = null;

  constructor(
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getCategories();

    this.allCategories$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(categories => {
        this.categoryTabs[0].categories$.next(categories.filter(category => category.type === 0));
        this.categoryTabs[1].categories$.next(categories.filter(category => category.type === 1));
        this.categoryTabs[2].categories$.next(categories.filter(category => category.type === 2));
        this.childrenCategories$.next(categories.filter(category => category.parentCategory !== null));
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
    console.log('Create Category');
  }

  typeChanged(index: number): void {
    console.log('Type Changed', index);
  }

  selectCategory(category: Category): void {
    console.log('Select Category', category);
    this.activeCategory = category;
  }

  editCategory(category: Category): void {
    console.log('Edit Category', category);
  }

  deleteCategory(id: number): void {
    console.log('Delete Category', id);
  }

}
