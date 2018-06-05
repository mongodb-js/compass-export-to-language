import { TextButton } from 'hadron-react-buttons';
import SelectLang from 'components/select-lang';
import { Modal, Alert } from 'react-bootstrap';
import React, { Component } from 'react';
import Editor from 'components/editor';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './export-modal.less';

class ExportModal extends Component {
  static displayName = 'ExportModalComponent';

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
    //   [ styles['export-to-lang-form-query-output-editor-copy'] ]: true
    // });

    const errorDiv = this.props.exportQuery.queryError
      ? <Alert bsStyle="danger" className={classnames(styles['export-to-lang-form-query-input-error'])} children={this.props.exportQuery.queryError}/>
      : '';

    return (
      <Modal
        show
        backdrop="static"
        bsSize="large"
        onHide={this.onExportModalToggle}
        dialogClassName="export-to-lang-modal">

        <Modal.Header>
          <Modal.Title>Export Query To Language</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form name="export-to-lang-form" data-test-id="export-to-lang" className="export-to-lang-form">
            <div className={classnames(styles['export-to-lang-form-headers'])}>
              <p className={classnames(styles['export-to-lang-form-headers-input'])}>My Query</p>
              <div className={classnames(styles['export-to-lang-form-headers-output'])}>
                <p className={classnames(styles['export-to-lang-form-headers-output-title'])}>Export Query To:</p>
                <SelectLang inputQuery={this.props.exportQuery.inputQuery} setOutputLang={this.props.setOutputLang} runQuery={this.props.runQuery} outputLang={this.props.exportQuery.outputLang}/> 
              </div>
            </div>
            <div className={classnames(styles['export-to-lang-form-query'])}>
              <div className={classnames(styles['export-to-lang-form-query-input'])}>
                <Editor outputQuery={this.props.exportQuery.returnQuery} queryError={this.props.exportQuery.queryError} outputLang={this.props.exportQuery.outputLang} inputQuery={this.props.exportQuery.inputQuery} input/>
                {errorDiv}
              </div>
              <div className={classnames(styles['export-to-lang-form-query-output'])}>
                <Editor outputQuery={this.props.exportQuery.returnQuery} queryError={this.props.exportQuery.queryError} outputLang={this.props.exportQuery.outputLang} inputQuery={this.props.exportQuery.inputQuery}/>
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <TextButton
            className="btn btn-default btn-sm"
            text="Close"
            clickHandler={()=>{}} />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ExportModal;
