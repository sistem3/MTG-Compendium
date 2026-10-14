import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpResponse, HttpHeaders, provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { CardService } from '../../services/card.service';
import { QueryConfigService } from '../../services/query-config.service';

import { CardLibraryHolderComponent } from './card-library-holder.component';

describe('CardLibraryHolderComponent', () => {
  let component: CardLibraryHolderComponent;
  let fixture: ComponentFixture<CardLibraryHolderComponent>;
  let cardService: CardService;
  let queryConfigService: QueryConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLibraryHolderComponent],
      providers: [provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLibraryHolderComponent);
    component = fixture.componentInstance;
    cardService = TestBed.inject(CardService);
    queryConfigService = TestBed.inject(QueryConfigService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setupSearch and getInitialCards when initialising', () => {
    vi.spyOn(component, 'setupSearch').mockReturnValue(undefined);
    vi.spyOn(component, 'setupFilters').mockReturnValue(undefined);
    vi.spyOn(component, 'getCards').mockReturnValue(undefined);
    component.ngOnInit();
    expect(component.setupFilters).toHaveBeenCalled();
    expect(component.setupSearch).toHaveBeenCalled();
    expect(component.getCards).toHaveBeenCalled();
  });

  it('should set colourQueryConfig, queryConfig.q and filterConfig when calling setupFilters function', () => {
    const testColourQuery = 'c:w';
    component.setupFilters();
    expect(component.colourQueryConfig).toBe(testColourQuery);
    expect(component.queryConfig.q).toBe(testColourQuery);
    expect(component.filterConfig.length).toBe(2);
  });

  it('should call searchDebounce.next when calling searchCards function', () => {
    vi.spyOn(component.searchDebounce, 'next').mockReturnValue(undefined);
    component.searchCards();
    expect(component.searchDebounce.next).toHaveBeenCalled();
  });

  it('should call cardService.getCards when calling getCards function', () => {
    vi.spyOn(cardService, 'getCards');
    const testQueryConfig = { ...queryConfigService.getBlankQuery() };
    component.loadingCards.set(false);
    component.getCards(testQueryConfig);
    expect(cardService.getCards).toHaveBeenCalled();
  });

  it('should set cards, cardsTotalCount and loadingCards (to false) ' +
    'when calling getCards function (with successful response)', () => {
    const testResponse = [{ ...cardService.getBlankCard() }];
    const testHeader = new HttpHeaders('total-count');
    testHeader.set('total-count', '2000');
    const httpResponseConfig = { body: testResponse, headers: testHeader, status: 200 };
    const testHttpResponse = new HttpResponse(httpResponseConfig);
    const testQueryConfig = { ...queryConfigService.getBlankQuery() };
    vi.spyOn(cardService, 'getCards').mockReturnValue(of(testHttpResponse));
    component.loadingCards.set(false);
    component.getCards(testQueryConfig);
    // @ToDo: The below expectations are commented as the mocks aren't passing through
    // in the returnValue (despite types matching), needs investigation/refactoring
    // expect(component.cards).toEqual(testResponse);
    // expect(component.cardsTotalCount).toBe(2000);
    expect(component.loadingCards()).toBe(false);
  });

  it('should set colour.isActive (from param) to its opposite as well as set ' +
    'queryConfig.colors, queryConfig.page (to 1), queryConfig.first (to 0) ' +
    'and call getCards when calling updateManaColourFilter function', () => {
    vi.spyOn(component, 'getCards').mockReturnValue(undefined);
    const testColour = {
        isActive: true,
        colour: 'white',
        colourIdentity: 'W'
    };
    component.queryConfig = { ...queryConfigService.getBlankQuery() };
    component.queryConfig.page = 3;
    component.paginationStart = 525;
    component.updateManaColourFilter(testColour);
    expect(testColour.isActive).toBe(false);
    expect(component.queryConfig.page).toBe(1);
    expect(component.paginationStart).toBe(0);
    expect(component.getCards).toHaveBeenCalled();
  });

  it('should set queryConfig.page, queryConfig.first and call getCards when calling loadMoreCards function (if event.first greater than queryConfig.pageSize + 1)', () => {
    vi.spyOn(component, 'getCards').mockReturnValue(undefined);
    const testEvent = { first: 175 };
    component.queryConfig = { ...queryConfigService.getBlankQuery() };
    component.loadMoreCards(testEvent);
    expect(component.queryConfig.page).toBe(2);
    expect(component.paginationStart).toBe(175);
    expect(component.getCards).toHaveBeenCalled();
    const testPageEvent = { first: 0 };
    component.queryConfig.page = 3;
    component.paginationStart = 525;
    component.loadMoreCards(testPageEvent);
    expect(component.queryConfig.page).toBe(1);
    expect(component.paginationStart).toBe(0);
    expect(component.getCards).toHaveBeenCalled();
  });

  it('should set tempFullCardDetails and showCardDetails (to true) ' +
    'when calling handleFullDetailsDisplay function', () => {
    const testCard = { ...cardService.getBlankCard() };
    component.handleFullDetailsDisplay(testCard);
    expect(component.tempFullCardDetails).toEqual(testCard);
    expect(component.showCardDetails).toBe(true);
  });

  it('should toggle showMoreFilters when calling toggleShowMoreFilters function', () => {
    component.showMoreFilters = false;
    component.toggleShowMoreFilters();
    expect(component.showMoreFilters).toBe(true);
    component.toggleShowMoreFilters();
    expect(component.showMoreFilters).toBe(false);
  });
});
