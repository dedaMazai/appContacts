import React, {Component} from 'react';
import ErrorMessage from '../errorMessage';

interface State {
    error: boolean;
}
type Props =  {
    children?: React.ReactNode| null;
}
export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            error: false
        };
      }

    componentDidCatch() {
        this.setState({error: true})
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        return this.props.children;
    }
}