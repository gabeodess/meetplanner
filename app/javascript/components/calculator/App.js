import React from "react"
import PropTypes from "prop-types"
class App extends React.Component {
  constructor() {
    super()
    this.state = { type: "sinclair" }
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
      break;
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
      break;
    case "sinclair":
      return this.sinclairTotal()
      break;
    default:
      alert("unknown state: \"" + this.state.type + "\"")
    }
  }

  sinclairTotal(){
    return parseFloat(this.state.weight) + parseFloat(this.state.total)
  }

  mastersTotal(){
    return parseFloat(this.state.weight) * parseFloat(this.state.total) * parseFloat(this.state.age)
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
