import {Promise} from 'es6-promise';

export default class APIManager {

         constructor() {
            this.apiKey = '49c67ed4bbf94ab89332bb408eede7d0'; 
            this.baseUri = 'http://api.football-data.org/alpha/';
        }
       
       _makeRequest(partialUri,apiKey) {
         
          var uri = this.baseUri + partialUri; 
          
         return new Promise(function(resolve,reject) {
             var oReq = new XMLHttpRequest();
             oReq.responseType = "text";
          
            oReq.open("GET", uri);
            
             oReq.setRequestHeader(
                "X-Auth-Token",
                apiKey
             );
            
            oReq.onload  = (e) =>  {
                if(e.target.status === 200) {
                    
                    resolve(e.target.responseText);
                }
            }
        
            oReq.onerror = (e) =>  {
               reject(e.target.status);
    
            }
            
            oReq.send();
        
         }); 
    }
    
    
    _getData(uri) {
         return this._makeRequest(uri, this.apiKey);
    }
        
     getAllData(leagueId, onDataLoaded) {
        var tableUri = `soccerseasons/${leagueId}/leagueTable/`;
        var fixturesUri = `soccerseasons/${leagueId}/fixtures/`;
         
        var getLeagueTablePromise = this._getData(tableUri);
        var getFixturesPromise = this._getData(fixturesUri);
         
        Promise.all([getLeagueTablePromise, getFixturesPromise]).then(function(data) { 
            onDataLoaded(data);
        });
         
     }
     
     getTable(leagueId) {
        var uri = `soccerseasons/${leagueId}/leagueTable/`;
        this._getData(uri); 
        
    }
    
    getFixtures(leagueId, onGetFixturesDone) {
        var uri = `soccerseasons/${leagueId}/fixtures/`;
        this._getData(uri);
        
    }
    
    
     
    
}
