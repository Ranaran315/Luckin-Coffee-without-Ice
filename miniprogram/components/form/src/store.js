
class Store {
	states;

	actions = {
		setLabelWidth(states,labelWidth) {
			states.labelWidth = labelWidth
		}
	}
	
	constructor() {
		this.states = {
			labelWidth: ""
		}
	}

	dispatch(_name,..._args) {
		const action = this.actions[_name]
		if (action) {
			action.apply(this,[this.states].concat(_args))
		} else {
			return new Error("没有找到" + _name + "这个dispatch")
		}
	}
}

export default Store