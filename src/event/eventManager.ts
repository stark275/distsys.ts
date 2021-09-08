import EventEmitter from 'events';

export default class EventManager {

    /**
    * @var    {EventEmitter}  
    */
    private _eventEmitter: EventEmitter;

    constructor() {
        this._eventEmitter =  new EventEmitter();
    }

    /**
    * @return   {EventManage}   
    */
    static factory(): EventManager{
        return new EventManager();
    }

    /**
    * @return   {EventManage}   
    */
    get eventEmitter(): EventEmitter{
        return this._eventEmitter
    }
}