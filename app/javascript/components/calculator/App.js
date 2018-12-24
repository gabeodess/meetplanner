import React from "react"

// TODO: find an acceptable location to store constants
const coefficients = {
  female: {
    A: 0.783497476,
    b: 153.655,
  },
  male: {
    A: 0.751945030,
    b: 175.508,
  }
}

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
  4.493
];

class App extends React.Component {
  constructor() {
    super()
    this.state = { type: "sinclair", gender: "male" }
    this.onRadioButtonClick = this.onRadioButtonClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  title(){
    var val = ""
    if (this.state.type == "masters") {
      val = "Masters "
    }
    return [val, "Sinclair Calculator"].join("")
  }

  totalTitle(){
    switch (this.state.type) {
    case "sinclair":
      return "Sinclair"
      break;
    case "masters":
      return "Sinclair-Meltzer-Faber"
    default:
      alert("unknown state: \"" + this.state.type + "\"")
    }
  }

  total(){
    if (!this.state.weight || !this.state.total) {
      return
    }
    switch (this.state.type) {
    case "masters":
      if (!this.state.age) {
        return
      }
      return this.mastersTotal()
    case "sinclair":
      return this.sinclairTotal()
    default:
      alert("unknown state: \"" + this.state.type + "\"")
    }
  }

  sinclairTotal(){
    const coefficient = coefficients[this.state.gender]
    let sinclairTotal = this.state.total
    if (this.state.weight <= coefficient.b) {
      const X = Math.log10(this.state.weight / coefficient.b);
      const SC = Math.pow(10, coefficient.A * Math.pow(X, 2));
      sinclairTotal = this.state.total * SC;
    }
    return sinclairTotal.toFixed(2);
  }

  mastersTotal(){
    const coefficient = coefficients[this.state.gender];
    let mastersTotal = this.state.total;

    if (this.state.weight <= coefficient.b) {
      const X = Math.log10(this.state.weight / coefficient.b);
      const SC = Math.pow(10, coefficient.A * Math.pow(X, 2));
      mastersTotal = this.state.total * SC * mastersCoefficients[this.state.age];
    }

     return mastersTotal.toFixed(2);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onRadioButtonClick(e){
    var $input = $(e.target).find("input:first")
    var val = $input.val()
    var name = $input.attr("name")

    this.setState({[name]: val})
  }

  // TODO: onTypeChanged in onClick on the label should be moved to an onChange on the input.  Bootstrap styles here seem to be disabling onChange somehow
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="btn-group btn-group-toggle p-0 col-sm-12" data-toggle="buttons">
            <label className="btn btn-primary rounded-0 col-sm-6 active" onClick={this.onRadioButtonClick}>
              <input type="radio" name="type" id="option1" autoComplete="off" value="sinclair"/>Sinclair
            </label>
            <label className="btn btn-primary rounded-0 col-sm-6" onClick={this.onRadioButtonClick}>
              <input type="radio" name="type" id="option2" autoComplete="off" value="masters"/> Masters
            </label>
          </div>
        </div>
        <div className="m-1">
          <div className="text-center h6">{this.title()}</div>

          <div className="btn-group btn-group-toggle p-0 col-sm-12" data-toggle="buttons">
            <label className="btn btn-primary col-sm-6 active" onClick={this.onRadioButtonClick}>
              <input type="radio" name="gender" autoComplete="off" value="male"/>Male
            </label>
            <label className="btn btn-primary col-sm-6" onClick={this.onRadioButtonClick}>
              <input type="radio" name="gender" autoComplete="off" value="female"/>Female
            </label>
          </div>

          <div className='row'>
            <div className="form-group col-6">
              <label htmlFor="weight">Weight (kg)</label>
              <input type="number" className="form-control" name="weight" id="weight" aria-describedby="weightHelp" placeholder="Enter weight" onChange={this.handleInputChange}/>
            </div>

            {
              this.state.type == "masters" ?
                <div className="form-group col-6">
                  <label htmlFor="age">Age</label>
                  <input type="number" className="form-control" name="age" value={this.state.age} id="age" aria-describedby="ageHelp" placeholder="Enter age" onChange={this.handleInputChange}/>
                </div> : null

            }
          </div>

          <div className="form-group">
            <label htmlFor="total">Total (kg)</label>
            <input type="number" className="form-control" name="total" id="total" aria-describedby="totalHelp" placeholder="Enter total" onChange={this.handleInputChange}/>
          </div>

          <div className="text-center">
            <div className="h6">{this.totalTitle()} Total:</div>
            <div className="h1">{this.total()}</div>
          </div>
        </div>
      </div>
    );
  }

}

export default App
