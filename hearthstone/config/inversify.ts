import { Container } from "inversify";
import cardModule from "../src/module/cardModule"
import "reflect-metadata";

const container = new Container();
container.load(cardModule);
export default container;