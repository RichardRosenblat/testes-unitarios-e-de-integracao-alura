/* eslint-disable no-undef */
import Item from '../item';

describe('Testes dos itens', () => {
  const item = new Item('Beterraba', 0.1, 3);
  it('Deve ter 3 campos: nome, valor e quantidade', () => {
    expect(item.nome).toBe('Beterraba');
    expect(item.valor).toBe(0.1);
    expect(item.quantidade).toBe(3);
  });

  it('Deve ter o preço calculado de acordo com a quantidade', () => {
    expect(item.pegaValorTotalItem()).toBeCloseTo(0.3);
  });
});
