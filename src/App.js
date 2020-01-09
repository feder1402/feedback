import React from 'react';

const {useReducer} = React;

const QuestionScreen = ({onClickGood, onClickBad, onClose}) => (
    <section className="ui-screen" data-testid="question-screen">
      <header>How was your experience?</header>
      <button
          onClick={onClickGood}
          data-testid="good-button"
          data-variant="good"
      >
        Good
      </button>
      <button onClick={onClickBad} data-testid="bad-button" data-variant="bad">
        Bad
      </button>
      <button data-testid="close-button" title="close" onClick={onClose}/>
    </section>
);


const FormScreen = ({onSubmit, onClose}) => (
    <form className="ui-screen"
          as="form"
          data-testid="form-screen"
          onSubmit={e => {
            e.preventDefault();
            const {response} = e.target.elements;

            onSubmit({
              value: response
            });
          }}
    >
      <header>Care to tell us why?</header>
      <textarea
          data-testid="response-input"
          name="response"
          placeholder="Complain here"
      />
      <button data-testid="submit-button">Submit</button>
      <button
          data-testid="close-button"
          title="close"
          type="button"
          onClick={onClose}
      />
    </form>
);

const ThanksScreen = ({onClose}) => (
    <section className="ui-screen" data-testid="thanks-screen">
      <header>Thanks for your feedback.</header>
      <button data-testid="close-button" title="close" onClick={onClose}/>
    </section>
);

const feedbackReducer = (state, event) => {
  switch (state) {
    case 'question':
      switch (event.type) {
        case 'GOOD':
          return 'thanks';
        case 'BAD':
          return 'form';
        case 'CLOSE':
          return 'closed';
        default:
          return state;
      }
    case 'form':
      switch (event.type) {
        case 'SUBMIT':
          return 'thanks';
        case 'CLOSE':
          return 'closed';
        default:
          return state;
      }
    case 'thanks':
      if (event.type === 'CLOSE') {
        return 'closed';
      } else {
        return state;
      }
    default:
      return state;
  }
}

const Feedback = () => {
  const [state, send] = useReducer(feedbackReducer, 'question');

  switch (state) {
    case 'question':
      return (
          <QuestionScreen
              onClickGood={() => send({type: 'GOOD'})}
              onClickBad={() => send({type: 'BAD'})}
              onClose={() => send({type: 'CLOSE'})}
          />
      );
    case 'form':
      return (
          <FormScreen
              onSubmit={value => send({type: 'SUBMIT', value})}
              onClose={() => send({type: 'CLOSE'})}
          />
      );
    case 'thanks':
      return <ThanksScreen onClose={() => send({type: 'CLOSE'})}/>;
    case 'closed':
    default:
      return null;
  }
}

const App = () => (
    <main className="ui-app">
      <Feedback/>
    </main>
);

export default App;
