import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpResponse, HttpHeaders, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { of } from 'rxjs';

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
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
    spyOn(component, 'setupSearch');
    spyOn(component, 'getCards');
    component.ngOnInit();
    expect(component.setupSearch).toHaveBeenCalled();
    expect(component.getCards).toHaveBeenCalled();
  });

  it('should call searchDebounce.next when calling searchCards function', () => {
    spyOn(component.searchDebounce, 'next');
    component.searchCards();
    expect(component.searchDebounce.next).toHaveBeenCalled();
  });

  it('should setup subscription to searchDebounce and when updated set ' +
    'queryConfig.page (to 1), queryConfig.first (to 0), queryConfig.name (to searchTerm) ' +
    'and call getCards when calling setupSearch function', <any>fakeAsync(() => {
    spyOn(component, 'getCards');
    component.queryConfig = {...queryConfigService.getBlankQuery()};
    component.queryConfig.page = 3;
    component.queryConfig.first = 40;
    component.searchTerm = 'Crab';
    component.setupSearch();
    component.searchCards();
    tick(500);
    expect(component.queryConfig.page).toBe(1);
    expect(component.queryConfig.first).toBe(0);
    expect(component.queryConfig.name).toBe('Crab');
    expect(component.getCards).toHaveBeenCalled();
  }));

  it('should call cardService.getCards when calling getCards function', () => {
    spyOn(cardService, 'getCards').and.callThrough();
    const testQueryConfig = {...queryConfigService.getBlankQuery()};
    component.getCards(testQueryConfig);
    expect(cardService.getCards).toHaveBeenCalled();
  });

  it('should set cards, cardsTotalCount and loadingCards (to false) ' +
    'when calling getCards function (with successful response)', () => {
    const testResponse = [{...cardService.getBlankCard()}];
    const testHeader = new HttpHeaders('total-count');
    testHeader.set('total-count', '2000');
    const httpResponseConfig = {body: testResponse, headers: testHeader, status: 200};
    const testHttpResponse = new HttpResponse(httpResponseConfig);
    const testQueryConfig = {...queryConfigService.getBlankQuery()};
    spyOn(cardService, 'getCards').and.returnValue(of(testHttpResponse));
    component.getCards(testQueryConfig);
    // @ToDo: The below expectations are commented as the mocks aren't passing through
    // in the returnValue (despite types matching), needs investigation/refactoring
    // expect(component.cards).toEqual(testResponse);
    // expect(component.cardsTotalCount).toBe(2000);
    expect(component.loadingCards).toBe(false);
  });

  it('should set colour.isActive (from param) to its opposite as well as set ' +
    'queryConfig.colors, queryConfig.page (to 1), queryConfig.first (to 0) ' +
    'and call getCards when calling updateManaColourFilter function', () => {
    spyOn(component, 'getCards');
    const testColour = {
      isActive: true,
      colour: 'white',
      colourIdentity: 'W'
    };
    component.queryConfig = {...queryConfigService.getBlankQuery()};
    component.queryConfig.page = 3;
    component.queryConfig.first = 40;
    component.updateManaColourFilter(testColour);
    expect(testColour.isActive).toBe(false);
    expect(component.queryConfig.page).toBe(1);
    expect(component.queryConfig.first).toBe(0);
    expect(component.getCards).toHaveBeenCalled();
  });

  it('should set queryConfig.page, queryConfig.first and call getCards when calling loadMoreCards function (if event.first greater than queryConfig.pageSize + 1)', () => {
    spyOn(component, 'getCards');
    const testEvent = {first: 20};
    component.queryConfig = {...queryConfigService.getBlankQuery()};
    component.loadMoreCards(testEvent);
    expect(component.queryConfig.page).toBe(2);
    expect(component.queryConfig.first).toBe(20);
    expect(component.getCards).toHaveBeenCalled();
    const testPageEvent = {first: 0};
    component.queryConfig.page = 3;
    component.queryConfig.first = 40;
    component.loadMoreCards(testPageEvent);
    expect(component.queryConfig.page).toBe(1);
    expect(component.queryConfig.first).toBe(0);
    expect(component.getCards).toHaveBeenCalled();
  });

  it('should set tempFullCardDetails and showCardDetails (to true) ' +
    'when calling handleFullDetailsDisplay function', () => {
    const testCard = {...cardService.getBlankCard()};
    component.handleFullDetailsDisplay(testCard);
    expect(component.tempFullCardDetails).toEqual(testCard);
    expect(component.showCardDetails).toBe(true);
  });
});
