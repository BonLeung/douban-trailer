import React, { Component } from 'react'
import Layout from '../../layouts/default'


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      years: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'],
      type: this.props.match.params.type,
      year: this.props.match.params.year,
      movies: []
    }
  }
  _renderContent() {
    const { movies } = this.state
    if (!movies || !movies.length) return null

    return (
      <Content movies={movies} />
    )
  }
  _getAllMovies() {

  }
  componentDidMount() {
    this._getAllMovies()
  }
  render() {
    return (
      <Layout>
        <div className="flex-row full">
          <Menu>
            {
              years.map((e, i) => (
                <Menu.Item>
                  <a href={`/year/${e}`}>{e}</a>
                </Menu.Item>
              ))
            }
          </Menu>
          <div className="flex-1 scroll-y align-self-start">
            {this._renderContent()}
          </div>
        </div>
      </Layout>
    )
  }
}
