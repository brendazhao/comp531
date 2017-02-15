//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false
        }
    }
    toggleDone(){
        if(this.state.done)
            this.setState({
                done:false
            })
        else
            this.setState({
                done:true
            })
    }
    removeTask(){
        this.props.remove()
    }
    render() { return (
        <li id={this.props.id}>
            <i className="check glyphicon glyphicon-check" onClick={()=>this.toggleDone()}></i>
            <span className={this.state.done?"completed":""}> {typeof(this.props.text) === "string" ? this.props.text : ""}></span>
            <i className="destroy glyphicon glyphicon-remove" onClick={()=>this.removeTask()}></i>
        </li>
    )}
}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
    }

    addTodo() {
        // IMPLEMENT ME!
        const text = document.getElementById("newTODO").value;
        document.getElementById("newTODO").value="";
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text}
            ]
        })
    }

    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }

    render() { return (
        <div>
            <input id="newTODO" type="text" placeholder="TO DO"></input>
            <button onClick={()=>this.addTodo()}>Add Item</button>
            <span className="submit">
                <a href="https://webdev-rice.herokuapp.com" target="_blank">Submit your exercise</a>
            </span>
            <ul className="todo">
                {this.state.todoItems.map((x)=><ToDoItem key={x.id} text={x.text} remove={()=>this.removeTodo(x.id)}/>)}
            </ul>
        </div>
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()
