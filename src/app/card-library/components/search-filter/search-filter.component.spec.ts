import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterConfig } from '../../interfaces/filter-config.interface';

import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;
  const testFilter: FilterConfig = {
    label: 'test',
    value: 'something',
    input_type: 'text'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('filterConfig', testFilter);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updatedFilterValue.emit when calling handleSelect function', () => {
    spyOn(component.updatedFilterValue, 'emit');
    component.handleSelect({});
    expect(component.updatedFilterValue.emit).toHaveBeenCalled();
  });
});
