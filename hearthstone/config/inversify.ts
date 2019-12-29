import { Container } from "inversify";
import cardModule from "../src/module/cardModule";
import firebaseModule from '../src/firebase/module';
import "reflect-metadata";

const container = new Container();
container.load(cardModule, firebaseModule);
export default container;