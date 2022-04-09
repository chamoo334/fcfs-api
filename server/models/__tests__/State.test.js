const mockingoose = require('mockingoose');
const state = require('../State');

describe('test mongoose State model', () => {
  it('should return the doc with findById', () => {
    const _doc = {
      _id: '507f191e810c19729de860ea',
      name: 'Test',
      identifier: 'TE',
    };

    mockingoose(state).toReturn(_doc, 'findOne');

    return state.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
      expect(JSON.parse(JSON.stringify(doc)).name).toBe('Test');
    });
  });
});
