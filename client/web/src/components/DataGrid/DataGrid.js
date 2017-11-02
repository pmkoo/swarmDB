import ReactDataGrid from 'react-data-grid'
import $j from 'jquery'
import './data-grid.css';

export default class DataGrid extends Component {

    constructor() {
        super();
        this.state = {
            gridHeight: 100
        };
        this.resizeGrid = () => this.setState({gridHeight: $j(this.wrapper).height()})
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeGrid);
        this.resizeGrid();
        this.canvas = this.grid.getDataGridDOMNode().querySelector('.react-grid-Canvas');
    }

    componentWillUpdate() {
        this.isAtBottom = this.canvas.scrollHeight - this.canvas.scrollTop === this.canvas.clientHeight;
    }

    componentDidUpdate() {
        this.isAtBottom && (this.canvas.scrollTop = this.canvas.querySelector('div').clientHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeGrid);
    }



    render() {
        const {...props} = this.props;
        const {gridHeight} = this.state;


        return (
            <div ref={r => this.wrapper = r} style={{height: '100%'}}>
                <ReactDataGrid
                    ref={r => this.grid = r}
                    minHeight={gridHeight} {...props}
                />
            </div>
        )
    }
}

