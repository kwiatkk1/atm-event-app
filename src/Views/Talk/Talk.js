// @flow
import React, {Component} from 'react';
import {Avatar, BottomNavigation, BottomNavigationItem, Paper, RaisedButton} from "material-ui";
import schedule from '../Schedule/schedule.json';
import slugify from 'slugify';
import config from '../../Config/theme';
import ActionHome from 'material-ui/svg-icons/action/home';
import ReactDisqusComments from 'react-disqus-comments';

window.disqus_developer = 1;

export default class Talk extends Component {

    render() {
        const item = schedule[0].agenda.find(it => slugify(it.title) === this.props.match.params.id);
        return (
            <div style={{margin: '0 auto', padding: '30px'}}>
                <Paper style={{padding: 30, textAlign: 'center'}} zDepth={1}>
                    {item.photo ? <Avatar size={140} src={item.photo}/> : null}
                    <h2 style={{color: config.palette.accent1Color}}>{item.speaker}</h2>
                    <h3>{item.title}</h3>
                    <RaisedButton style={{width: '90%', margin: 10}} label="Oceń Wystąpienie" secondary={true}/>
                    <BottomNavigation style={{marginTop: 20}}>
                        <BottomNavigationItem label="Button1" icon={<ActionHome/>}/>
                        <BottomNavigationItem label="Button2" icon={<ActionHome/>}/>
                    </BottomNavigation>
                </Paper>
                <h2>Komentarze</h2>
                <Paper style={{padding: 30, marginTop: 30, position: 'relative'}} zDepth={1}>
                    <ReactDisqusComments
                        shortname="atm-1"
                        identifier={item.title}
                        onNewComment={this.handleNewComment}/>
                    <div style={{
                        backgroundColor: '#fff',
                        position: 'absolute',
                        bottom: '15px',
                        display: 'block',
                        height: '75px',
                        width: '86%'
                    }}/>
                </Paper>
            </div>
        )
    }
}