import React from 'react'
import { Form } from 'semantic-ui-react'
const API = 'http://localhost:3000/pokemon'

class PokemonForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleChange = (e, {name, value}) => {
    e.preventDefault()
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, hp, frontUrl, backUrl } = this.state
    fetch(API, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        stats: [{
          value: hp,
          name: 'hp'
        }],
        sprites: {
          front: frontUrl,
          back: backUrl
        }
      })
    })
    .then(r=>r.json())
    .then(pokemon=>{
      this.props.addPokemon(pokemon)
      this.setState({
        name: '',
        hp: '',
        frontUrl: '',
        backUrl: ''
      })
    })
  }

  render() {
    const { name, hp, frontUrl, backUrl } = this.state
    console.log(this.state);
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.handleChange} value={this.state.name} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.handleChange} value={this.state.hp} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={this.handleChange} value={this.state.frontUrl} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={this.handleChange} value={this.state.backUrl} />
          </Form.Group>

          <Form.Button disabled={(!!name && !!hp && !!frontUrl && !!backUrl) ? false : true }>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
