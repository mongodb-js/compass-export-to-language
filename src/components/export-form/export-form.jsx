import SelectLang from 'components/select-lang';
import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import Editor from 'components/editor';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './export-form.less';

class ExportForm extends Component {
  static displayName = 'ExportFormComponent';

  static propTypes = {
    exportQuery: PropTypes.object.isRequired,
    setOutputLang: PropTypes.func.isRequired,
    copyQuery: PropTypes.func.isRequired,
    runQuery: PropTypes.func.isRequired
  }

  copyHandler = (evt) => {
    evt.preventDefault();
    this.props.copyQuery(this.props.exportQuery.returnQuery);
  }

  render() {
    // const copyButtonStyle = classnames({
    //   'btn': true,
    //   'btn-sm': true,
    //   'btn-default': true,
    //   [ styles['export-to-lang-query-output-editor-copy'] ]: true
    // });

    const errorDiv = this.props.exportQuery.queryError
      ? <Alert bsStyle="danger" className={classnames(styles['export-to-lang-query-input-error'])} children={this.props.exportQuery.queryError}/>
      : '';

    return (
      <form name="export-to-lang" data-test-id="export-to-lang" className="export-to-lang">
        <div className={classnames(styles['export-to-lang-headers'])}>
          <p className={classnames(styles['export-to-lang-headers-input'])}>My Query</p>
          <div className={classnames(styles['export-to-lang-headers-output'])}>
            <p className={classnames(styles['export-to-lang-headers-output-title'])}>Export Query To:</p>
            <SelectLang inputQuery={this.props.exportQuery.inputQuery} setOutputLang={this.props.setOutputLang} runQuery={this.props.runQuery} outputLang={this.props.exportQuery.outputLang}/>
          </div>
        </div>
        <div className={classnames(styles['export-to-lang-query'])}>
          <div className={classnames(styles['export-to-lang-query-input'])}>
            <Editor outputQuery={this.props.exportQuery.returnQuery} queryError={this.props.exportQuery.queryError} outputLang={this.props.exportQuery.outputLang} inputQuery={this.props.exportQuery.inputQuery} input/>
            {errorDiv}
          </div>
          <div className={classnames(styles['export-to-lang-query-output'])}>
            <Editor outputQuery={this.props.exportQuery.returnQuery} queryError={this.props.exportQuery.queryError} outputLang={this.props.exportQuery.outputLang} inputQuery={this.props.exportQuery.inputQuery}/>
          </div>
        </div>
      </form>
    );
  }
}

export default ExportForm;
