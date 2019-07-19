import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import '../styles/app.css'
import { Text, TextArea, Button } from '../components'

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: ${props => `linear-gradient(to top left, ${props.theme.colors.red}, ${props.theme.colors.purple})`};
`

const StyledCard = styled.div`
  width: 400px;
  height: 350px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  border-radius: 3px;
  padding: 25px;
  text-align: center;
  margin: 0px 15px;
`

const StyledThumb = styled.i`
  color: ${({ theme }) => theme.colors.lightgrey};
  transition: 0.2s;
  font-size: 22px;
  display: block;
  margin-bottom: 3px;

  &:hover {
    transition: 0.2s;
    cursor: pointer;
    color: ${props => props.up ? props.theme.colors.green : props.theme.colors.red};
  }
`

const StyledA = styled.a`
  background-color: #1f1f1f;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.sans};
  padding: 10px;
  margin: 5px 0px 3px 0px;
  border-radius: 3px;
  text-decoration: none;
  width: 95%;
  display: block;

  &:hover {
    text-decoration: none !important;
  }
`

const SubmitReview = ({ handleChange, handleSubmit, value }) => (
  <StyledCard>
    <Text bold big>Movie Review Analyzer 📽</Text>
    <form id="review_form" onSubmit={handleSubmit}>
      <TextArea
        value={value}
        onChange={handleChange}
        name="review"
        rows="14"
        placeholder="Enter a movie review and we'll try to figure out if it's a positive or negative review."
      />
    </form>
    <Button type="submit" form="review_form">Analyze</Button>
  </StyledCard>
)

const Results = ({ response, review, handleYesClick, handleNoClick, truncate }) => (
  <StyledCard style={{ display: 'flex', alignItems: 'space-between', justifyContent: 'center' }}>
    <div>
      <div>
        <Text big bold>Analysis Results</Text>
      </div>
      <div style={{ margin: '10px' }}>
        <Text grey italic>
          "{truncate(review)}"
        </Text>
      </div>
      <div style={{ margin: '50px 10px 75px 10px' }}>
        <Text bold medium>
          We're{" "}
          <Text medium bold>{Math.round(response.confidence * 100)}%</Text>{" "}
          sure that this review was{" "}
          <Text
            style={{ display: "block", marginTop: 10 }}
            huge
            bold
            red={response.sentiment === "negative"}
            green={response.sentiment === "positive"}>
            {response.sentiment}
          </Text>
        </Text>
      </div>
      <div style={{ marginBottom: 15 }}>
        <Text medium>Do you agree with our analysis?</Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: "100%" }} onClick={handleYesClick}>
          <StyledThumb id="thumbs-up" up className="fas fa-thumbs-up" />
          <Text id="thumbs-up-text" grey>Spot on, brother!</Text>
        </div>
        <div style={{ width: "100%" }} onClick={handleNoClick}>
          <StyledThumb id="thumbs-down" className="fas fa-thumbs-down" />
          <Text id="thumbs-down-text" grey>Not even close, dude!</Text>
        </div>
      </div>
    </div>
  </StyledCard >
)

const ThankYou = ({ reset }) => (
  <StyledCard style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ marginBottom: 10 }}>
      <Text big bold>Thank You!</Text>
    </div>
    <div style={{ marginBottom: 5 }}>
      <Text medium>Thanks for checking out my first attempt at machine learning, and for helping improve the classifier 😁.</Text>
    </div>
    <div style={{ margin: 5 }}>
      <Text medium>Feel free to check it out on Github, or try another review.</Text>
    </div>
    <div>
      <StyledA href="https://github.com/rocky1638/movie-review-sentiment-analysis-api" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /> Github</StyledA>
      <Button onClick={reset}>🏠 Home</Button>
    </div>
  </StyledCard>
)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      stage: 1,
    }
  }

  truncate = text => {
    const length = 130

    if (text.length < length) return text

    return `${text.substring(0, length)}...`
  }

  reset = () => {
    this.setState({
      value: "",
      response: {},
      stage: 1,
    })
  }

  handleYesClick = e => {
    e.preventDefault()

    const { value, response } = this.state

    axios.post('/api/feedback', {
      review: value,
      prediction: response.sentiment,
      feedback: "Correct",
    })
      .then(() => this.setState({ stage: 3 }))
      .catch(err => console.error(err))
  }

  handleNoClick = e => {
    e.preventDefault()

    const { value, response } = this.state

    axios.post('/api/feedback', {
      review: value,
      prediction: response.sentiment,
      feedback: "Incorrect",
    })
      .then(() => this.setState({ stage: 3 }))
      .catch(err => console.error(err))
  }

  handleChange = e => {
    e.preventDefault()

    this.setState({ value: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    if (this.state.value.length === 0) return

    axios.post('/api/process', {
      review: this.state.value,
    })
      .then(res => {
        this.setState({
          response: res.data,
          stage: 2,
        })
      })
      .catch(e => console.error(e))
  }

  render() {
    const { stage } = this.state
    return (
      <StyledContainer>
        {stage === 1 &&
          <SubmitReview
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            value={this.state.value}
          />}
        {stage === 2 &&
          <Results
            response={this.state.response}
            review={this.state.value}
            handleYesClick={this.handleYesClick}
            handleNoClick={this.handleNoClick}
            truncate={this.truncate}
          />}
        {stage === 3 &&
          <ThankYou reset={this.reset} />
        }
        <div style={{ position: 'absolute', left: '50%', bottom: "20px" }}>
          <div style={{ position: 'relative', left: '-50%' }}>
            <Text white>Made with ⌨ by Rock Zhou</Text>
          </div>
        </div>
      </StyledContainer>
    );
  }
}

export default App;
