import React, {Component, PropTypes} from 'react'

let answers = [];
let questionText;

const shuffle = (array) => {
    var newarr = []
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        newarr[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue;

    }

    return newarr;
};

export default class QuestionAnswer extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        correct_answers: PropTypes.array.isRequired,
        incorrect_answers: PropTypes.array.isRequired,
        send_answer: PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {


        console.log("state" + nextState);
        console.log("next question" + nextProps.question.question);
        console.log("question text" + questionText);
        if (nextProps.question.question !== questionText) {
            answers = [];
        }

        console.log("here??");
        return true;
    }


    render() {

        const {question, correct_answers, incorrect_answers, send_answer} = this.props

        const buttonPad = {
            "marginLeft": "5px",
            "marginRight": "5px",
            "marginTop": "10px",
            "cursor": "pointer"
        };

        questionText = question.question;

        if (answers.length === 0) {
            answers = shuffle(correct_answers.concat(incorrect_answers))
        }

        return (
            <div className="card-block" key={question.text}>
                <div className="btn-block">
                    {answers.map(function (answer, i) {
                        return <button type="button" key={answer}
                                       onClick={() => {
                                           question.answer = answer;
                                           send_answer(question)
                                       }}
                                       className="btn btn-primary" style={buttonPad}>{answer}</button>
                    })}
                </div>
            </div>
        )
    }
}
