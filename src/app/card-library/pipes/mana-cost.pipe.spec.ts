import { ManaCostPipe } from './mana-cost.pipe';

describe('ManaCostPipe', () => {
  it('create an instance', () => {
    const pipe = new ManaCostPipe();
    expect(pipe).toBeTruthy();
  });

  it('return a formatted string based on input value', () => {
    const pipe = new ManaCostPipe();
    const whiteTest: any = pipe.transform('{W}');
    expect(whiteTest.includes('white')).toBe(true);
    const blueTest: any = pipe.transform('{U}');
    expect(blueTest.includes('blue')).toBe(true);
    const redTest: any = pipe.transform('{R}');
    expect(redTest.includes('red')).toBe(true);
    const greenTest: any = pipe.transform('{G}');
    expect(greenTest.includes('green')).toBe(true);
    const blackTest: any = pipe.transform('{B}');
    expect(blackTest.includes('black')).toBe(true);
    const defaultTest: any = pipe.transform('{1}');
    expect(defaultTest.includes('icon-1')).toBe(true);
  });
});
