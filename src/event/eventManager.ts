import EventEmitter from 'events';

export default class EventManager {

    private _eventEmitter: EventEmitter;

    constructor() {
        this._eventEmitter =  new EventEmitter();
    }

    static factory(): EventManager{
        return new EventManager();
    }

    get eventEmitter(): EventEmitter{
        return this._eventEmitter
    }
}