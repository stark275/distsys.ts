import Node from "./Node";

export default abstract class NodePark {

    private static nodes: Node[] = [
        Node.factory(
            {
                protocol: "http:",
                host: "127.0.0.1", //"192.168.43.237",
                port: 8003,
                path: "/ping",
                method: "GET"
            },
            'server',
            'unknown'
        ),
        Node.factory(
            {
                protocol: "http:",
                host: "127.0.0.1",//"192.168.43.237",
                port: 8004,
                path: "/ping",
                method: "GET"
            },
            'server',
            'unknown'
        ),
        Node.factory(
            {
                protocol: "http:",
                host: "127.0.0.1",//"192.168.43.237",
                port: 8005,
                path: "/ping",
                method: "GET"
            },
            'server',
            'unknown'
        ),
        Node.factory(
            {
                protocol :"http:",
                host: "localhost",
                port: 4000,
                path: "/ping",
                method: "GET"
            },
            'server',
            'unknown'
        ),
        Node.factory(
            {
                protocol :"http:",
                host: "localhost",
                port: 4001,
                path: "/",
                method: "GET"
            },
            'server',
            'unknown'
        ),
        Node.factory(
            {
                protocol :"http:",
                host: "localhost",
                port: 4002,
                path: "/",
                method: "GET"
            },
            'server',
            'unknown'
        ),
    ];

   static getAllNodes() {
        return [...NodePark.nodes];
    }

}
