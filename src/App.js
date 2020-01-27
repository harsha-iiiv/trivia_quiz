import React, { Component } from 'react'
import logo from './logo.svg';
import QuestionList from './components/QuestionList'
import Scorecard from './components/Score'
import FinalRes from './components/FinalRes'
import './App.css';

import { createQuizData as qData } from './api/FormateQ'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      score: 0,
      current: 0,
      loading: undefined
    }
  }

  setCurrent(current) {
    this.setState({ current })
  }

  setScore(score) {
    this.setState({ score })
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true })
      this.setState({ questions: await qData(), loading: false })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (this.state.loading === false) {
      if (this.state.current >= this.state.questions.length) {
        var scorecard = ''
        var finalRes = <FinalRes {...this.state} />
      } else {
        scorecard = <Scorecard {...this.state} />
        finalRes = ''
      }

      return (
        <div>
          
          {scorecard}
          <QuestionList
            {...this.state}
            setCurrent={this.setCurrent.bind(this)}
            setScore={this.setScore.bind(this)}
          />
          {finalRes}
          

        </div>
      )
    } else {
      return null
    }
  }
}

export default App;