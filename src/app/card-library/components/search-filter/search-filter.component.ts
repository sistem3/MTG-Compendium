import { Component, input, output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// Prime
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
// Interfaces
import { FilterConfig } from '../../interfaces/filter-config.interface';

@Component({
  selector: 'app-search-filter',
  imports: [FormsModule, InputTextModule, SelectModule, TooltipModule],
  templateUrl: './search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent implements OnInit {
  filterConfig = input.required<FilterConfig>();
  updatedFilterValue = output<FilterConfig>();
  removeFilterEmitter = output<FilterConfig>();
  searchDebounce: Subject<any> = new Subject();
  selectedValue?: string = undefined;

  ngOnInit(): void {
    if (this.filterConfig().input_type === 'text') {
      this.setupTextSearch();
    }
  }

  setupTextSearch() {
    this.searchDebounce.asObservable()
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.updateFilter();
      });
  }

  handleSearch() {
    this.searchDebounce.next(null);
  }

  updateFilter() {
    this.filterConfig().selected_value = this.selectedValue;
    this.updatedFilterValue.emit(this.filterConfig());
  }

  removeFilter(filter: FilterConfig) {
    this.removeFilterEmitter.emit(filter);
  }
}
