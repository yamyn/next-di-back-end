import 'server-only'

import { AwilixContainer } from "awilix";

import { createDIContainer } from "./core";
import { ApiDIContainer } from "./types";

const globalForApiContainer = global as unknown as { ApiContainer: AwilixContainer<ApiDIContainer> }

const ApiContainer = globalForApiContainer.ApiContainer || createDIContainer()

if (process.env.NODE_ENV !== 'production') globalForApiContainer.ApiContainer = ApiContainer

export default ApiContainer;