import AppRegistry from 'hadron-app-registry';
import configureStore from 'stores';
import compiler from 'bson-transpilers';

const subscribeCheck = (s, pipeline, check, done) => {
  const unsubscribe = s.subscribe(() => {
    expect(s.getState().queryError).to.equal(null);
    if (check(s.getState())) {
      unsubscribe();
      done();
    }
  });
  return unsubscribe;
};

describe('ExportToLanguage Store', () => {
  const appRegistry = new AppRegistry();
  let unsubscribe;
  let store;

  beforeEach(() => {
    store = configureStore({ localAppRegistry: appRegistry });
  });

  describe('#onActivated', () => {
    afterEach(() => {
      if (unsubscribe !== undefined) unsubscribe();
    });

    describe('when aggregation opens export to language', () => {
      const agg = `{
  0: true, 1: 1, 2: NumberLong(100), 3: 0.001, 4: 0x1243, 5: 0o123,
  7: "str", 8: RegExp('10'), '8a': /abc/, '8b': RegExp('abc', 'i'),
  9: [1,2], 10: {x: 1}, 11: null, 12: undefined,
  100: Code("1", {x: 1}), '100a': Code("!"), 101: ObjectId(),
  103: DBRef("c", ObjectId()), 104: 1, 105: NumberInt(1), 106: NumberLong(1),
  107: MinKey(), 108: MaxKey(), 110: Timestamp(1, 100),
  111: Symbol('1'), 112: NumberDecimal(1), 200: Date(), '201a': new Date(),
  '201b': ISODate(), '201c': new ISODate()
}`;
      it('opens the aggregation modal', (done) => {
        unsubscribe = subscribeCheck(store, agg, (s) => (s.modalOpen), done);
        appRegistry.emit('open-aggregation-export-to-language', agg);
      });

      it('sets namespace to Pipeline', (done) => {
        unsubscribe = subscribeCheck(store, agg, (s) => (
          s.mode === 'Pipeline'
        ), done);
        appRegistry.emit('open-aggregation-export-to-language', agg);
      });

      it('adds input query to the state', (done) => {
        unsubscribe = subscribeCheck(store, agg, (s) => (
          s.inputQuery === agg
        ), done);
        appRegistry.emit('open-aggregation-export-to-language', agg);
      });

      it('triggers run query command', (done) => {
        unsubscribe = subscribeCheck(store, agg, (s) => (
          s.returnQuery === compiler.shell.python.compile(agg)
        ), done);
        appRegistry.emit('open-aggregation-export-to-language', agg);
      });
    });

    describe('when query opens export to language', () => {
      const query = {filter: `{
  isQuery: true, 0: true, 1: 1, 2: NumberLong(100), 3: 0.001, 4: 0x1243, 5: 0o123,
  7: "str", 8: RegExp('10'), '8a': /abc/, '8b': RegExp('abc', 'i'),
  9: [1,2], 10: {x: 1}, 11: null, 12: undefined,
  100: Code("1", {x: 1}), '100a': Code("!"), 101: ObjectId(),
  103: DBRef("c", ObjectId()), 104: 1, 105: NumberInt(1), 106: NumberLong(1),
  107: MinKey(), 108: MaxKey(), 110: Timestamp(1, 100),
  111: Symbol('1'), 112: NumberDecimal(1), 200: Date(), '201a': new Date(),
  '201b': ISODate(), '201c': new ISODate()
}`};
      it('opens the query modal', (done) => {
        unsubscribe = subscribeCheck(store, query, (s) => (s.modalOpen), done);
        appRegistry.emit('open-query-export-to-language', query);
      });

      it('sets namespace to Query', (done) => {
        unsubscribe = subscribeCheck(store, query, (s) => (
          s.mode === 'Query'
        ), done);
        appRegistry.emit('open-query-export-to-language', query);
      });

      it('adds input query to the state', (done) => {
        unsubscribe = subscribeCheck(store, query, (s) => (
          s.inputQuery === query
        ), done);
        appRegistry.emit('open-query-export-to-language', query);
      });

      it('triggers run query command', (done) => {
        unsubscribe = subscribeCheck(store, query, (s) => (
          s.returnQuery === compiler.shell.python.compile(query.filter)
        ), done);
        appRegistry.emit('open-query-export-to-language', query);
      });
    });
  });
});
