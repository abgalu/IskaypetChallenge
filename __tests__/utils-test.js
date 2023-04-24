import { getMapConfig, getPrincipalName } from '../src/shared/utils';

test('getMapConfig', () => {
  const result = getMapConfig('label', { lat: '1', lng: '2' });
  expect(result).toEqual({
    android: `geo:0,0?q=1,2(label)`,
    ios: `maps:0,0?q=label@1,2`,
  });
});

test('getPrincipalName', () => {
  const result = getPrincipalName('Name (This is a name)');
  expect(result).toEqual('Name');
});
