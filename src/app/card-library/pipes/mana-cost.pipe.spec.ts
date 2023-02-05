import { ManaCostPipe } from './mana-cost.pipe';

describe('ManaCostPipe', () => {
  it('create an instance', () => {
    const pipe = new ManaCostPipe();
    expect(pipe).toBeTruthy();
  });

  it('return a formatted string based on input value', () => {
    const pipe = new ManaCostPipe();
    const whiteTest: any = pipe.transform('{W}', 'cost');
    expect(whiteTest.includes('white')).toBe(true);
    const blueTest: any = pipe.transform('{U}', 'cost');
    expect(blueTest.includes('blue')).toBe(true);
    const redTest: any = pipe.transform('{R}', 'cost');
    expect(redTest.includes('red')).toBe(true);
    const greenTest: any = pipe.transform('{G}', 'cost');
    expect(greenTest.includes('green')).toBe(true);
    const blackTest: any = pipe.transform('{B}', 'cost');
    expect(blackTest.includes('black')).toBe(true);
    const defaultTest: any = pipe.transform('{1}', 'cost');
    expect(defaultTest.includes('icon-1')).toBe(true);
    expect(defaultTest.includes('mana-icon-holder small')).toBe(true);
    const inlineTest: any = pipe.transform('{W}', 'inline');
    expect(inlineTest.includes('white')).toBe(true);
    expect(inlineTest.includes('mana-icon-holder extra-small')).toBe(true);
    const emptyTest: any = pipe.transform('', 'inline');
    expect(emptyTest).toBe('');
  });
});
