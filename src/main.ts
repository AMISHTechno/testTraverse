import dotenv from 'dotenv';
import path from 'path';
import {} from './D3.js'

dotenv.config({path:'../.env/'});

const depGraph = new DependencyGraph('/path/to/project');
depGraph.scanAndMapDependencies();
depGraph.outputToJson('myProject');
