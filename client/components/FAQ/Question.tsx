
import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

/**
 * @component Question
 * @description 
 */
export const Question = ({ id, parent, question, answer }) => {
    return (
        <div className="panel panel-default ">
            <div className="panel-heading accordion-toggle collapsed question-toggle" data-toggle="collapse" data-parent={parent} data-target={`#${id}`}>
                <h3 className="panel-title">
                    <a href="#" className="ing">{question}</a>
                </h3>
            </div>
            <div id={id} className="panel-collapse collapse" style={{ height: 0 }}>
                <div className="panel-body">
                    <ReactMarkdown source={answer} escapeHtml={false} skipHtml={false} />
                </div>
            </div>
        </div>
    );
}