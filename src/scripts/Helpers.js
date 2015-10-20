import _ from 'underscore'; 

export default class Helpers {
    
    constructor() {
        
        this.leagueIds = {
            "PremierLeague" : 398
        }
    }
    
    
       getLeagueIds(leagueId) {
        return this.leagueIds[leagueId];
        
    }
}
