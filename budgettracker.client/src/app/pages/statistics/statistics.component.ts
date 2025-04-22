import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {DataService} from "../../services/data.service";
import {
  addMonths, addQuarters, addWeeks, addYears,
  subMonths, subQuarters, subWeeks, subYears,
  endOfMonth, endOfQuarter, endOfWeek, endOfYear,
  format, startOfMonth, startOfQuarter, startOfWeek, startOfYear,
} from "date-fns";
import { OperationTypes, Transaction} from "../../shared/models";
import { ChartConfiguration} from "chart.js";

interface IPeriod {
  id: number;
  name: string;
  label: string;
}

interface tabChart {
  id: OperationTypes;
  name: string;
  cgf: ChartConfiguration,
  total: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  periods = [
    {
      id: 1,
      name: "week",
      label: "Week",
    },
    {
      id: 2,
      name: "month",
      label: "Month",
    },
    {
      id: 3,
      name: "quarter",
      label: "Quarter",
    },
    {
      id: 4,
      name: "year",
      label: "Year",
    }
  ];

  statisticsTabs: tabChart[] = [
    {
      id: 0,
      name: 'Expenses',
      cgf: {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: []
        }
      },
      total: 0,
    },
    {
      id: 1,
      name: 'Incomes',
      cgf: {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: []
        }
      },
      total: 0,
    }
  ];

  startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd');
  endDate = format(endOfMonth(new Date()), 'yyyy-MM-dd');

  activePeriod: IPeriod = this.periods[1];
  activeDate = new Date();

  transactions$ = new BehaviorSubject<Transaction[] | null>(null);

  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectPeriod(period: IPeriod): void {
    this.activePeriod = period;

    const periodFunctions: Record<number, () => [Date, Date]>  = {
      1: () => [startOfWeek(this.activeDate, { weekStartsOn: 1 }), endOfWeek(this.activeDate, { weekStartsOn: 1 })],
      2: () => [startOfMonth(this.activeDate), endOfMonth(this.activeDate)],
      3: () => [startOfQuarter(this.activeDate), endOfQuarter(this.activeDate)],
      4: () => [startOfYear(this.activeDate), endOfYear(this.activeDate)]
    };

    const [start, end] = (periodFunctions[period.id] || periodFunctions[2])();
    this.startDate = format(start, 'yyyy-MM-dd');
    this.endDate = format(end, 'yyyy-MM-dd');

    this.getTransactions();
  }

  getTransactions(): void {
    const startDate = this.startDate;
    const endDate = this.endDate;

    this.dataService.getTransactions({startDate, endDate})
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(data => this.transactions$.next(data))
      )
      .subscribe(() => this.createCharts())
  }

  createCharts(): void {
    this.statisticsTabs.forEach(tab => {
      const filtered = this.transactions$.value?.filter(t => t.type === tab.id);
      const grouped = this.groupTransactions(filtered!);

      tab.cgf.data = {
        labels: grouped.map((t: any) => t.categoryName),
        datasets: [{data: grouped.map((t: any) => t.totalAmount)}]
      }

      tab.total = grouped.map((t: any) => t.totalAmount)
        .reduce((acc: number, num: number) => acc + num, 0);
    });
  }

  groupTransactions(transactions: Transaction[]): any {
    const groupedTransactions = transactions.reduce((acc: any, transaction) => {
      const { categoryId, categoryName, amount } = transaction;

      if (!acc[categoryId]) {
        acc[categoryId] = { categoryName, totalAmount: 0 };
      }

      acc[categoryId].totalAmount += amount;
      return acc;
    }, {});

    return Object.values(groupedTransactions);
  }

  changeDates(direction: boolean): void {
    const periodMap: Record<number, (date: Date, amount: number) => Date> = {
      1: direction ? addWeeks : subWeeks,
      2: direction ? addMonths : subMonths,
      3: direction ? addQuarters : subQuarters,
      4: direction ? addYears : subYears,
    };

    this.activeDate = (periodMap[this.activePeriod.id] || (direction ? addMonths : subMonths))(this.activeDate, 1);

    this.selectPeriod(this.activePeriod);
  }
}
