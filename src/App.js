import React from 'react';

const { useReducer, useEffect } = React;

function useKeyDown(key, onKeyDown) {
  useEffect(() => {
    const handler = e => {
      if (e.key === key) {
        onKeyDown();
      }
    };

    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, [onKeyDown]);
}

function Screen({ children, as, ...props }) {
  if (as === 'form') {
    return <form className="ui-screen" {...props}>{children}</form>;
  }
  return <section className="ui-screen">{children}</section>
}

function QuestionScreen({ onClickGood, onClickBad, onClose }) {
  useKeyDown('Escape', onClose);

  return (
      <Screen data-testid="question-screen">
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
        <button data-testid="close-button" title="close" onClick={onClose} />
      </Screen>
  );
}

function FormScreen({ onSubmit, onClose }) {
  useKeyDown('Escape', onClose);

  return (
      <Screen
          as="form"
          data-testid="form-screen"
          onSubmit={e => {
            e.preventDefault();
            const { response } = e.target.elements;

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
            onKeyDown={e => {
              if (e.key === 'Escape') {
                e.stopPropagation();
              }
            }}
        />
        <button data-testid="submit-button">Submit</button>
        <button
            data-testid="close-button"
            title="close"
            type="button"
            onClick={onClose}
        />
      </Screen>
  );
}

function ThanksScreen({ onClose }) {
  useKeyDown('Escape', onClose);

  return (
      <Screen data-testid="thanks-screen">
        <header>Thanks for your feedback.</header>
        <button data-testid="close-button" title="close" onClick={onClose} />
      </Screen>
  );
}

function feedbackReducer(state, event) {
  console.log(event)
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
      switch (event.type) {
        case 'CLOSE':
          return 'closed';
        default:
          return state;
      }
    default:
      return state;
  }
}

function Feedback() {
  const [state, send] = useReducer(feedbackReducer, 'question');

  switch (state) {
    case 'question':
      return (
          <QuestionScreen
              onClickGood={() => send({ type: 'GOOD' })}
              onClickBad={() => send({ type: 'BAD' })}
              onClose={() => send({ type: 'CLOSE' })}
          />
      );
    case 'form':
      return (
          <FormScreen
              onSubmit={value => send({ type: 'SUBMIT', value })}
              onClose={() => send({ type: 'CLOSE' })}
          />
      );
    case 'thanks':
      return <ThanksScreen onClose={() => send({ type: 'CLOSE' })} />;
    case 'closed':
    default:
      return null;
  }
}

function App() {
  return (
      <main className="ui-app">
        <Feedback />
      </main>
  );
}

export default App;
