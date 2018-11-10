import React from 'react';
import Action from './Action';
import { Editor, EditorState, RichUtils } from 'draft-js';
import '../draft.css';

const ACTIONS = [
    'BOLD',
    'ITALIC'
];

export default class MyEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            editor: null
        }
    }

    componentDidMount() {
        this.setState({
            editor: Editor
        });
    }

    onChange = (editorState) => {
        console.log(editorState);
        this.setState({
            editorState
        });
    }

    handleKeyCommand = (command, editorState) => {
        console.log(command);
        const newState = RichUtils.handleKeyCommand(editorState, command);
        console.log("rho", newState);
        if (newState) {
            this.onChange(newState);
        }
    }

    onActionClick = (command) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, command));
    }

    convertToHTML = () => {
        this.setState({
            html: this.refs.editor.editor.innerHTML
        });
    }

    render() {
        const ClientEditor = this.state.editor
        return (
            <div className='mainDiv'>
                <style jsx>{`
                        .mainDiv {
                            width: 200px;
                            border: 1px solid lightgray;
                            height: auto;
                        }
                        .actions {
                            display: flex;
                        }
                        .editor {
                            height: 200px;
                        }
                    `}</style>
                <div className='actions'>
                    {ACTIONS.map(action => <Action key={`action-${action}`} onActionClick={this.onActionClick} action={action}></Action>)}
                </div>
                <div className='editor'>
                    {
                        this.state.editor ?
                            <ClientEditor
                                ref={'editor'}
                                editorState={this.state.editorState}
                                handleKeyCommand={this.handleKeyCommand}
                                onChange={this.onChange}
                            ></ClientEditor> : null
                    }
                </div>
                <div onClick={this.convertToHTML}>
                    Convert to HTML
                </div>
                <div>
                    {this.state.html}
                </div>
            </div>
        );
    }
}
