import reducer, {
  ADD_INPUT_QUERY,
  INCLUDE_IMPORTS,
  INCLUDE_DRIVER,
  USE_BUILDERS,
  SET_NAMESPACE,
  SET_URI,
  OUTPUT_LANG,
  QUERY_ERROR,
  TOGGLE_MODAL,
  COPY_QUERY,
  CLEAR_COPY,
  COPY_TO_CLIPBOARD_FN_CHANGED,
  includeImports,
  useBuilders,
  includeDriver,
  setOutputLang,
  addInputQuery,
  setNamespace,
  setUri,
  copyToClipboardFnChanged,
  toggleModal,
  queryError,
  copyQuery,
  clearCopy,
  runQuery
} from 'modules/export-query';

describe('export query module', () => {
  describe('#copyOutput', () => {
    it('returns a copy query action type', () => {
      expect(copyQuery('test query to copy')).to.deep.equal({
        type: COPY_QUERY,
        input: 'test query to copy'
      });
    });
  });

  describe('#queryError', () => {
    it('returns a query error action type', () => {
      expect(queryError('could not find [')).to.deep.equal({
        type: QUERY_ERROR,
        error: 'could not find ['
      });
    });
  });

  describe('#toggleModal', () => {
    it('returns a toggle modal action type', () => {
      expect(toggleModal(true)).to.deep.equal({
        type: TOGGLE_MODAL,
        open: true
      });
    });
  });

  describe('#clearCopy', () => {
    it('returns a clear copy action type', () => {
      expect(clearCopy()).to.deep.equal({
        type: CLEAR_COPY
      });
    });
  });

  describe('#setNamespace', () => {
    it('returns a namespace type event', () => {
      expect(setNamespace('Pipeline')).to.deep.equal({
        type: SET_NAMESPACE,
        namespace: 'Pipeline'
      });
    });
  });

  describe('#setUri', () => {
    it('returns a uri type event', () => {
      expect(setUri('localhost')).to.deep.equal({
        type: SET_URI,
        uri: 'localhost'
      });
    });
  });


  describe('#addInputQuery', () => {
    it('returns a add input query input type', () => {
      expect(addInputQuery('{ "item": "happy socks", "quantity": 2 }')).to.deep.equal({
        type: ADD_INPUT_QUERY,
        input: '{ "item": "happy socks", "quantity": 2 }'
      });
    });
  });

  describe('#runQuery', () => {
    it('returns state with return query', () => {
      expect(runQuery('csharp', '{x, 1}')).to.be.a('function');
    });
  });

  describe('#setOutputLang', () => {
    it('returns an outputLang action type', () => {
      expect(setOutputLang('csharp')).to.deep.equal({
        type: OUTPUT_LANG,
        lang: 'csharp'
      });
    });
  });

  describe('#includeImports', () => {
    it('returns an includeImports action type', () => {
      expect(includeImports(true)).to.deep.equal({
        type: INCLUDE_IMPORTS,
        imports: true
      });
    });
  });

  describe('#useBuilders', () => {
    it('returns an useBuilders action type', () => {
      expect(useBuilders(true)).to.deep.equal({
        type: USE_BUILDERS,
        builders: true
      });
    });
  });

  describe('#includeDriver', () => {
    it('returns an includeDriver action type', () => {
      expect(includeDriver(true)).to.deep.equal({
        type: INCLUDE_DRIVER,
        driver: true
      });
    });
  });

  describe('#copyToClipboardFnChanged', () => {
    it('returns the COPY_TO_CLIPBOARD_FN_CHANGED action', () => {
      expect(copyToClipboardFnChanged('testing')).to.deep.equal({
        type: COPY_TO_CLIPBOARD_FN_CHANGED,
        copyToClipboardFn: 'testing'
      });
    });
  });

  describe('#reducer', () => {
    context('action type is queryError', () => {
      it('query error is has a value in state', () => {
        expect(reducer(undefined, queryError('uh oh'))).to.deep.equal({
          outputLang: 'python',
          queryError: 'uh oh',
          namespace: 'Query',
          uri: '',
          copySuccess: false,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });

    context('action type is includeImports', () => {
      it('imports true includes imports in state', () => {
        expect(reducer(undefined, includeImports(true))).to.deep.equal({
          outputLang: 'python',
          namespace: 'Query',
          uri: '',
          copySuccess: false,
          queryError: null,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: true,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });

      it('imports false returns empty imports in state', () => {
        expect(reducer(undefined, includeImports(false))).to.deep.equal({
          outputLang: 'python',
          namespace: 'Query',
          uri: '',
          copySuccess: false,
          queryError: null,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });

    context('action type is useBuilders', () => {
      it('builders true includes builders in state', () => {
        expect(reducer(undefined, useBuilders(true))).to.deep.equal({
          outputLang: 'python',
          namespace: 'Query',
          uri: '',
          copySuccess: false,
          queryError: null,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });

      it('builders false returns false builders in state', () => {
        expect(reducer(undefined, useBuilders(false))).to.deep.equal({
          outputLang: 'python',
          namespace: 'Query',
          uri: '',
          copySuccess: false,
          queryError: null,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: false,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });

    context('action type is includeDriver', () => {
      it('driver true includes driver in state', () => {
        expect(reducer(undefined, includeDriver(true))).to.deep.equal({
          outputLang: 'python',
          namespace: 'Query',
          uri: '',
          copySuccess: false,
          queryError: null,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: true,
          copyToClipboardFn: null
        });
      });

      it('driver false returns false driver in state', () => {
        expect(reducer(undefined, includeDriver(false))).to.deep.equal({
          outputLang: 'python',
          namespace: 'Query',
          uri: '',
          copySuccess: false,
          queryError: null,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });


    context('action type is addInputQuery', () => {
      it('inputQuery has a value in state', () => {
        expect(reducer(undefined, addInputQuery('{ "beep": "boop" }'))).to.deep.equal({
          inputQuery: '{ "beep": "boop" }',
          outputLang: 'python',
          copySuccess: false,
          namespace: 'Query',
          uri: '',
          modalOpen: false,
          queryError: null,
          returnQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });

    context('action type is setOutputLang', () => {
      it('inputQuery has a value in state', () => {
        expect(reducer(undefined, setOutputLang('csharp'))).to.deep.equal({
          outputLang: 'csharp',
          copySuccess: false,
          namespace: 'Query',
          uri: '',
          modalOpen: false,
          queryError: null,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });

    context('action type is toggleModal', () => {
      it('modalOpen is true in state', () => {
        expect(reducer(undefined, toggleModal(true))).to.deep.equal({
          outputLang: 'python',
          copySuccess: false,
          namespace: 'Query',
          uri: '',
          queryError: null,
          modalOpen: true,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });

    context('action type is toggleModal', () => {
      it('modalOpen is false in state', () => {
        expect(reducer(undefined, toggleModal(false))).to.deep.equal({
          outputLang: 'python',
          copySuccess: false,
          namespace: 'Query',
          uri: '',
          modalOpen: false,
          queryError: null,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });

    context('action type is clearCopy', () => {
      it('returns a clearCopy state', () => {
        expect(reducer(undefined, clearCopy())).to.deep.equal({
          outputLang: 'python',
          copySuccess: false,
          namespace: 'Query',
          uri: '',
          queryError: null,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });

    context('action type is setNamespace', () => {
      it('returns a namespace in state', () => {
        expect(reducer(undefined, setNamespace('Pipeline'))).to.deep.equal({
          namespace: 'Pipeline',
          uri: '',
          outputLang: 'python',
          copySuccess: false,
          queryError: null,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });

    context('action type is copyToClipboardFnChanged', () => {
      it('returns a fn in state', () => {
        expect(reducer(undefined, copyToClipboardFnChanged('test'))).to.deep.equal({
          namespace: 'Query',
          uri: '',
          outputLang: 'python',
          copySuccess: false,
          queryError: null,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: 'test'
        });
      });
    });

    context('an empty action type returns an intial state', () => {
      it('empty initial state comes back', () => {
        expect(reducer(undefined, {})).to.deep.equal({
          outputLang: 'python',
          copySuccess: false,
          namespace: 'Query',
          uri: '',
          queryError: null,
          modalOpen: false,
          returnQuery: '',
          inputQuery: '',
          imports: '',
          showImports: false,
          builders: true,
          driver: false,
          copyToClipboardFn: null
        });
      });
    });
  });
});
