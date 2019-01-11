import React from 'react';

// TODO: find an acceptable location to store constants
const coefficients = {
  female: {
    A: 0.783497476,
    b: 153.655,
  },
  male: {
    A: 0.751945030,
    b: 175.508,
  },
};

const pad = new Array(30).fill(null);
const mastersCoefficients = [...pad,
  1.000, 1.016, 1.031, 1.046,
  1.059, 1.072, 1.083, 1.096,
  1.109, 1.122, 1.135, 1.149,
  1.162, 1.176, 1.189, 1.203,
  1.218, 1.233, 1.248, 1.263,
  1.279, 1.297, 1.316, 1.338,
  1.361, 1.385, 1.411, 1.437,
  1.462, 1.488, 1.514, 1.541,
  1.568, 1.598, 1.629, 1.663,
  1.699, 1.738, 1.779, 1.823,
  1.867, 1.910, 1.953, 2.004,
  2.060, 2.117, 2.181, 2.255,
  2.336, 2.419, 2.504, 2.597,
  2.702, 2.831, 2.981, 3.153,
  3.352, 3.580, 3.843, 4.145,
  4.493,
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: 'sinclair', gender: 'male', age: null };
    this.onRadioButtonClick = this.onRadioButtonClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onRadioButtonClick(e) {
    const $input = $(e.target).find('input:first');
    const val = $input.val();
    const name = $input.attr('name');

    this.setState({ [name]: val });
  }

  onInputChange(event) {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  }

  totalTitle() {
    const { type } = this.state;
    switch (type) {
      case 'sinclair':
        return 'Sinclair';
      case 'masters':
        return 'Sinclair-Meltzer-Faber';
      default:
        console.log(`unknown state: "${type}"`); // eslint-disable-line no-console
        return null;
    }
  }

  total() {
    const {
      weight, total, type, age,
    } = this.state;
    if (!weight || !total) {
      return null;
    }
    switch (type) {
      case 'masters':
        if (!age) {
          return null;
        }
        return this.mastersTotal();
      case 'sinclair':
        return this.sinclairTotal();
      default:
        console.log(`unknown type: "${type}"`); // eslint-disable-line no-console
        return null;
    }
  }

  sinclairTotal() {
    const { gender, total, weight } = this.state;
    const coefficient = coefficients[gender];
    let sinclairTotal = total;
    if (weight <= coefficient.b) {
      const X = Math.log10(weight / coefficient.b);
      const SC = 10 ** (coefficient.A * (X ** 2));
      sinclairTotal = total * SC;
    }
    return sinclairTotal.toFixed(2);
  }

  mastersTotal() {
    const {
      gender, total, weight, age,
    } = this.state;
    const coefficient = coefficients[gender];
    let mastersTotal = total;

    if (weight <= coefficient.b) {
      const X = Math.log10(weight / coefficient.b);
      const SC = 10 ** (coefficient.A * (X ** 2));
      mastersTotal = total * SC * mastersCoefficients[age];
    }

    return mastersTotal.toFixed(2);
  }

  title() {
    const { type } = this.state;
    let val = '';
    if (type === 'masters') {
      val = 'Masters ';
    }
    return [val, 'Sinclair Calculator'].join('');
  }

  // TODO: onTypeChanged in onClick on the label should be moved to an onChange on the input.
  // Bootstrap styles here seem to be disabling onChange somehow
  render() {
    const { type } = this.state;
    let { age } = this.state;
    age = age || '';

    return (
      <div className="container">
        <div className='row mt-sm-5'>
          <div className='col-md-6 offset-md-3'>
            <div className="row">
              <div className="btn-group btn-group-toggle p-0 col-sm-12" data-toggle="buttons">
                <label className="btn btn-primary rounded-0 col-sm-6 active" htmlFor="type-sinclair" onClick={this.onRadioButtonClick}>
                  <input type="radio" name="type" autoComplete="off" value="sinclair" id="type-sinclair" />
                  Sinclair
                </label>
                <label className="btn btn-primary rounded-0 col-sm-6" htmlFor="type-masters" onClick={this.onRadioButtonClick}>
                  <input type="radio" name="type" autoComplete="off" value="masters" id="type-masters" />
                  Masters
                </label>
              </div>
            </div>
            <div className="m-1">
              <div className="text-center h6">{this.title()}</div>

              <div className="btn-group btn-group-toggle p-0 col-sm-12" data-toggle="buttons">
                <label htmlFor="gender-male" className="btn btn-primary col-sm-6 active" onClick={this.onRadioButtonClick}>
                  <input type="radio" name="gender" id="gender-male" autoComplete="off" value="male" />
                  Male
                </label>
                <label htmlFor="gender-female" className="btn btn-primary col-sm-6" onClick={this.onRadioButtonClick}>
                  <input type="radio" name="gender" id="gender-female" autoComplete="off" value="female" />
                  Female
                </label>
              </div>

              <div className="row">
                <div className="form-group col-6">
                  <label htmlFor="weight">
                    Weight (kg)
                    <input type="number" className="form-control" name="weight" id="weight" aria-describedby="weightHelp" placeholder="Enter weight" onChange={this.onInputChange} />
                  </label>
                </div>

                {
                  type === 'masters' ? (
                    <div className="form-group col-6">
                      <label htmlFor="age">
                        Age
                        <input type="number" value={age} className="form-control" name="age" id="age" aria-describedby="ageHelp" placeholder="Enter age" onChange={this.onInputChange} />
                      </label>
                    </div>
                  ) : null
                }
              </div>

              <div className="form-group">
                <label htmlFor="total">
                  Total (kg)
                  <input type="number" className="form-control" name="total" id="total" aria-describedby="totalHelp" placeholder="Enter total" onChange={this.onInputChange} />
                </label>
              </div>

              <div className="text-center">
                <div className="h6">
                  {this.totalTitle()}
                  Total:
                </div>
                <div className="h1">{this.total()}</div>
              </div>
            </div>
          </div>
          </div>
        </div>
    );
  }
}

export default App;
