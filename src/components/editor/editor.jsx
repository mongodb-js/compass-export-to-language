import stringify from 'javascript-stringify';
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/csharp';
import 'brace/mode/python';
import 'brace/mode/java';

import 'mongodb-ace-theme';

import styles from './editor.less';

class Editor extends PureComponent {
  static displayName = 'EditorComponent';

  // input query can be an object(empty query) or a string(an actual query) so
  // check for any
  static propTypes = {
    outputQuery: PropTypes.string.isRequired,
    inputQuery: PropTypes.any.isRequired,
    outputLang: PropTypes.string.isRequired,
    queryError: PropTypes.string,
    imports: PropTypes.string,
    input: PropTypes.bool
  };

  // need to be able to stringify and add spaces to prettify the object
  componentDidMount() {
    if (this.props.input && this.props.inputQuery !== '') {
      this.editor.setValue(stringify(this.props.inputQuery, null, 2));
      this.editor.clearSelection();
    }
  }

  componentDidUpdate() {
    if (!this.props.input) {
      if (this.props.outputLang === 'java') {
        this.editor.setValue(this.formatJava());
      } else if (this.props.outputLang === 'csharp') {
        this.editor.setValue(this.formatCsharp());
      } else if (this.props.outputLang === 'python') {
        this.editor.setValue(this.formatPython());
      } else {
        this.editor.setValue(this.props.outputQuery);
      }
      this.editor.session.setMode('ace/mode/' + this.props.outputLang || 'javascript');
      this.editor.clearSelection();
    }

    // set this again in case it's missing
    if (this.props.input && this.props.inputQuery !== '') {
      this.editor.setValue(stringify(this.props.inputQuery, null, 2));
      this.editor.clearSelection();
    }
  }

  formatJava = () => {
    const string = this.props.outputQuery.split(/(?=.append)/g).join('\n\t\t');
    const output = this.props.imports !== '' ? this.props.imports + '\n' + string : string;

    return output;
  }

  formatPython = () => {
    const strings = this.props.outputQuery.split(/(?=})|,/g);
    const string = strings.slice(0, -1).join('\n\t\t') + '\n' + strings.slice(-1);
    const output = this.props.imports !== '' ? this.props.imports + '\n' + string : string;

    return output;
  }

  formatCsharp = () => {
    const strings = this.props.outputQuery.split(/(?={)/g);
    for (let i = 0; i < strings.length; i++) {
      if (i !== 0 && strings[i] !== '{ ') {
        strings[i] = '\t\t' + strings[i];
      }
    }
    const string = strings.join('\n\t\t');
    const output = this.props.imports !== '' ? this.props.imports + '\n' + string : string;

    return output;
  }

  render() {
    const OPTIONS = {
      tabSize: 2,
      fontSize: 11,
      minLines: 5,
      maxLines: Infinity,
      showGutter: true,
      readOnly: true,
      highlightActiveLine: false,
      highlightGutterLine: false,
      useWorker: false
    };

    const queryStyle = (this.props.queryError && this.props.input)
      ? classnames(styles['editor-error'])
      : classnames(styles.editor);

    const value = this.props.input ? '' : this.props.outputQuery || this.props.imports;

    return (
      <div className={queryStyle}>
        <AceEditor
          mode="javascript"
          defaultValue=""
          value={value}
          theme="mongodb"
          width="100%"
          editorProps={{$blockScrolling: Infinity}}
          setOptions={OPTIONS}
          onLoad={(editor) => { this.editor = editor; }}/>
      </div>
    );
  }
}

export default Editor;
