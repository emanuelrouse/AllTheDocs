import React, { Component } from 'react';
import './MainPage.css';
import StackOverflowList from '../Lists/StackOverflowList'
import DocsList from '../Lists/DocsList'
import YoutubeList from '../Lists/YoutubeList'
import Nav from '../Nav/Nav'

// const database = [
//     {
//       term: 'fetch',
//       docsData: {
//         mdn: "some shit",
//       },
//       stackOverflowData: 'https://somebullshit.com/api/question/',
//       youtubeData: 'https://someYTbullshit.com/api/videos/',
//     },
//     {
//       term: 'throw',
//       docsData: {
//         mdn: "other shit",
//       },
//       stackOverflowData: 'https://someotherbullshit.com/api/question/',
//       youtubeData: 'https://someotherYTbullshit.com/api/videos/',
//     }
// ]

// sample database obj 

/*
    youtubeData: {
        title: ,
        videoId: , 
    }
*/

class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: '',
            stackOverflowData: [],
            docsData: [],
            youtubeData: [],
        }
    }
    static defaultProps = {
        tempArray: []
    }

    handleInputChange = (event) => {
        const target = event.target
        const searchTerm = target.value
        this.setState({
            searchQuery: searchTerm
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const searchQuery = this.state.searchQuery
        ////////////////////// docs fetch//////////////////////////
        // const docsURL = `http://localhost:8000/api/documents`
        // fetch(docsURL, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         searchQuery: searchQuery
        //     })
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         return alert(`response not ok`)
        //     }
        //     return response.json()
        // })
        // .then(responseJson => {
        //     console.log(responseJson)
            
        //     const stackOverflowArr = []
        //     const docsArr = []
        //     const youtubeArr = []
        //     // use the array to update the state
        //         // iterate through the array
        //     responseJson.forEach(entry => {
        //         // store the stackOverflowData of each into its own array
        //         // if (entry.stackOverflowData) {
        //         //     stackOverflowArr.push(entry.stackOverflowData)
        //         //     console.log(stackOverflowArr);
        //         // }
        //         // store the docsData of each into its own array
        //         docsArr.push({
        //             mdnpagelink: entry.mdnpagelink,
        //             reactpagelink: entry.reactpagelink
        //         })
        //         // store the youtubeData of each into its own array
        //         // if (entry.youtubeData) {
        //         //     youtubeArr.push(entry.youtubeData)
        //         // }
        //         // update the state with each of those arrays
        //         this.setState({
        //             stackOverflowData: stackOverflowArr,
        //             docsData: docsArr,
        //             youtubeData: youtubeArr,
        //         }, () => console.log(this.state.docsData))
        //     })
        // })

        ////////////////////// youtube fetch//////////////////////////
        // const apiKey = "AIzaSyAORFjA-PflHUei6AhhWJvIxYVuEpJlX90"
        // const yturl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchQuery}&type=video&key=${apiKey}`
        // const ytDataArr = [];
        // fetch(yturl)
        //     .then(response => response.json())
        //     .then(responseJson => {
        //         responseJson.items.forEach(item => {
        //             ytDataArr.push({
        //                 id : item.id.videoId,
        //                 title: item.snippet.title,
        //                 url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        //                 thumbnail: item.snippet.thumbnails.default.url,
        //             })
        //         });
                
        //         this.setState({
        //             youtubeData: ytDataArr,
        //         }, function() {
        //             console.log(this.state.youtubeData)
        //         })
        //     })
        //     .catch(err => console.log(err))
        
        
        // stackoverflow fetch
        /*stackoverflowData = { 
            title: "question title",
            link: "https:somelink/quetisons/${questionId}/question-title", 
        }*/

        // https://api.stackexchange.com//2.2/search/advanced?order=desc&sort=relevance&q=fetch&site=stackoverflow

        // run the fetch grab the title and link 
        // add the title and link to the stackoverflowData arr
        // set the state to the updated obj

        ////////////////////// stackoverflow fetch//////////////////////////
        const url = `https://api.stackexchange.com//2.2/search/advanced?order=desc&sort=relevance&q=${searchQuery}&site=stackoverflow`
        const stackOverflowArr = [];
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                const firstFiveResults = responseJson.items.slice(0, 5);
                firstFiveResults.forEach(result => {
                    stackOverflowArr.push({
                        title: result.title,
                        link: result.link,
                    })
                })
                console.log(stackOverflowArr)

                this.setState({
                    stackOverflowData: stackOverflowArr,
                }, () => console.log(this.state.stackOverflowData))
            })
            .catch(err => console.log(err));
    }

    // ['/', '/login-page', '/', '/main-page']

    handleLogout = () => {
        this.props.history.push('/')
    }

    render() {
        let docsDisplay = <DocsList docsData={this.state.docsData} />
        let stackDisplay = <StackOverflowList data={this.state.stackOverflowData} />
        let youtubeDisplay = <YoutubeList data={this.state.youtubeData} />
        
        return (
            <div className="main-page">
                <Nav handleLogout={this.handleLogout} />
                <main>
                    <section className="search-bar border">
                        <form action="" onSubmit={this.handleFormSubmit}>
                            <button type="submit">Search</button> 
                            <input type="text" name="searchbar" value={this.state.searchQuery} onChange={this.handleInputChange} />
                        </form>
                    </section>
                    <section className="stack-overflow border">
                        {stackDisplay || []}
                    </section>
                    <section className="documentation border">
                        {docsDisplay || []}
                    </section>
                    <section className="youtube border">
                        {youtubeDisplay || []}
                    </section>
                </main>
            </div>
        )
    }
}

export default MainPage