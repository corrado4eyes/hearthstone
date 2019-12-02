import { Container } from "inversify";
import cardModule from "../src/module/cardModule"

const container = new Container();
container.load(cardModule);
export default container;