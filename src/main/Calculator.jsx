import React, {Component} from "react";
import './Calculator.css'
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayvalue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component{
    state = {...initialState}
    
    clearMemory(){
        this.setState(...initialState)
    }

    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
        }
        else{
            const equals = operation === '='
            const currentOp = this.state.operation

            const values = [...this.state.values]
            try{
                values[0] = eval(`${values[0]} ${currentOp} ${values[1]}`)
            }
            catch(e){
                values[0] = this.state.values[0];
            }
            
            values[1] = 0

            this.setState({
                displayvalue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(digit){
        if(digit === '.' && this.state.displayvalue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayvalue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayvalue
        const displayvalue = currentValue + digit
        this.setState({displayvalue, clearDisplay: false})

        if(digit !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayvalue)
            const values = [...this.state.values]
            values[i] = newValue

            this.setState({values})
        }
    }
    
    
    render(){
        const addDigit = n => this.addDigit(n)
        const setOp = op => this.setOperation(op)
        return (
          <div className="Calculator">
            <Display value={this.state.displayvalue}></Display>
            <Button label="AC" click={() => this.clearMemory()} triple></Button>
            <Button label="/" click={setOp} operation></Button>
            <Button label="7" click={addDigit}></Button>
            <Button label="8" click={addDigit}></Button>
            <Button label="9" click={addDigit}></Button>
            <Button label="*" click={setOp} operation></Button>
            <Button label="4" click={addDigit}></Button>
            <Button label="5" click={addDigit}></Button>
            <Button label="6" click={addDigit}></Button>
            <Button label="-" click={setOp} operation></Button>
            <Button label="1" click={addDigit}></Button>
            <Button label="2" click={addDigit}></Button>
            <Button label="3" click={addDigit}></Button>
            <Button label="+" click={setOp} operation></Button>
            <Button label="0" click={addDigit} double></Button>
            <Button label="." click={addDigit}></Button>
            <Button label="=" click={setOp} operation></Button>
          </div>
        );
    }
}