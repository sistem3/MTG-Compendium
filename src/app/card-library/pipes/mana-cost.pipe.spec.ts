import { ManaCostPipe } from './mana-cost.pipe';

describe('ManaCostPipe', () => {
  it('create an instance', () => {
    const pipe = new ManaCostPipe();
    expect(pipe).toBeTruthy();
  });

  it('return a formatted string based on input value', () => {
    const pipe = new ManaCostPipe();
    // Colour Checks
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
    // Default Check
    const defaultTest: any = pipe.transform('{1}', 'cost');
    expect(defaultTest.includes('icon-1')).toBe(true);
    expect(defaultTest.includes('mana-icon-holder small')).toBe(true);
    // Inline Check
    const inlineTest: any = pipe.transform('{W}', 'inline');
    expect(inlineTest.includes('white')).toBe(true);
    expect(inlineTest.includes('mana-icon-holder extra-small')).toBe(true);
    // Mixed Colours Check
    const whiteBlueTest: any = pipe.transform('{W/U}', 'cost');
    expect(whiteBlueTest.includes('white-blue')).toBe(true);
    const whiteBlackTest: any = pipe.transform('{W/B}', 'cost');
    expect(whiteBlackTest.includes('white-black')).toBe(true);
    const blueBlackTest: any = pipe.transform('{U/B}', 'cost');
    expect(blueBlackTest.includes('blue-black')).toBe(true);
    const blueRedTest: any = pipe.transform('{U/R}', 'cost');
    expect(blueRedTest.includes('blue-red')).toBe(true);
    const blackRedTest: any = pipe.transform('{B/R}', 'cost');
    expect(blackRedTest.includes('black-red')).toBe(true);
    const blackGreenTest: any = pipe.transform('{B/G}', 'cost');
    expect(blackGreenTest.includes('black-green')).toBe(true);
    const redWhiteTest: any = pipe.transform('{R/W}', 'cost');
    expect(redWhiteTest.includes('red-white')).toBe(true);
    const redGreenTest: any = pipe.transform('{R/G}', 'cost');
    expect(redGreenTest.includes('red-green')).toBe(true);
    const greenWhiteTest: any = pipe.transform('{G/W}', 'cost');
    expect(greenWhiteTest.includes('green-white')).toBe(true);
    const greenBlueTest: any = pipe.transform('{G/B}', 'cost');
    expect(greenBlueTest.includes('green-blue')).toBe(true);
    // Mono Check
    const monoWhiteTest: any = pipe.transform('{2/W}', 'cost');
    expect(monoWhiteTest.includes('mono-white')).toBe(true);
    const monoBlueTest: any = pipe.transform('{2/U}', 'cost');
    expect(monoBlueTest.includes('mono-blue')).toBe(true);
    const monoBlackTest: any = pipe.transform('{2/B}', 'cost');
    expect(monoBlackTest.includes('mono-black')).toBe(true);
    const monoRedTest: any = pipe.transform('{2/R}', 'cost');
    expect(monoRedTest.includes('mono-red')).toBe(true);
    const monoGreenTest: any = pipe.transform('{2/G}', 'cost');
    expect(monoGreenTest.includes('mono-green')).toBe(true);
    // Phyrexian Check
    const phyrexianWhiteTest: any = pipe.transform('{W/P}', 'cost');
    expect(phyrexianWhiteTest.includes('phyrexian-white')).toBe(true);
    const phyrexianBlueTest: any = pipe.transform('{U/P}', 'cost');
    expect(phyrexianBlueTest.includes('phyrexian-blue')).toBe(true);
    const phyrexianBlackTest: any = pipe.transform('{B/P}', 'cost');
    expect(phyrexianBlackTest.includes('phyrexian-black')).toBe(true);
    const phyrexianRedTest: any = pipe.transform('{R/P}', 'cost');
    expect(phyrexianRedTest.includes('phyrexian-red')).toBe(true);
    const phyrexianGreenTest: any = pipe.transform('{G/P}', 'cost');
    expect(phyrexianGreenTest.includes('phyrexian-green')).toBe(true);
    // Empty Check
    const emptyTest: any = pipe.transform('', 'inline');
    expect(emptyTest).toBe('');
  });
});
