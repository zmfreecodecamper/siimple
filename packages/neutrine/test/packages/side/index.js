Neutrine.ready(function () {
    //Side testing component
    class SideTest extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                "visible": true,
                "position": "top",
                "width": "300px"
            };
            //Bind methods
            this.handleToggle = this.handleToggle.bind(this);
        }
        //Handle toggle click
        handleToggle() {
            return this.setState({
                "visible": !this.state.visible
            });
        }
        //Render the side test
        render () {
            return (
                <React.Fragment>
                    <Neutrine.Btn color="primary" onClick={this.handleToggle}>
                        Open side
                    </Neutrine.Btn>
                    <Neutrine.Side visible={this.state.visible}>
                        <Neutrine.SideBackground onClick={this.handleToggle} />
                        <Neutrine.SideContent position={this.state.position} size={this.state.width}>
                            <Neutrine.SideHeader>
                                Title
                                <Neutrine.SideClose onClick={this.handleToggle} />
                            </Neutrine.SideHeader>
                            <Neutrine.SideBody>
                                    Content of the side component 1
                            </Neutrine.SideBody>
                            <Neutrine.SideBody>
                                    Content of the side component 2
                            </Neutrine.SideBody>
                            <Neutrine.SideBody>
                                    Content of the side component 3
                            </Neutrine.SideBody>
                        </Neutrine.SideContent>
                    </Neutrine.Side>
                </React.Fragment>
            );
        }
    };
    //Mount side test component
    ReactDOM.render(<SideTest />, document.getElementById("root"));
});

