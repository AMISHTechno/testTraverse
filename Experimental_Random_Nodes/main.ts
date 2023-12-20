
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export const theme = 'Federal Services SAP Fiori';
const graph = generateRandomGraph(theme, 10, 60);

interface Node {
    id: string;
    name: string;
    type: 'POM' | 'Test';
    dependenciesCount: number;
    dependentPOMs: string[];
}

interface Link {
    source: string;
    target: string;
    connections: number;
}




function generateRandomName(type: 'POM' | 'Test', theme: string, index: number): string {
    const uiComponents = ['Button', 'Form', 'List', 'Table', 'Chart', 'Dialog', 'Tile'];
    const testActions = ['Click', 'Submit', 'Validate', 'Navigate', 'Load', 'Refresh'];
    const pagePOMs = ['BASE', 'IncomeAndAssets', 'OIExplorer', 'SWE', 'CustomerDetails', 'OrderManagement', 'ServiceRequest'];

    const component = uiComponents[Math.floor(Math.random() * uiComponents.length)];
    if (type === 'POM') {
        const pagePOM = pagePOMs[Math.floor(Math.random() * pagePOMs.length)];
        return `${pagePOM}_${component}_${index}`;
    } else {
        const action = testActions[Math.floor(Math.random() * testActions.length)];
        return `${pagePOMs}_${action}${component}`;
    }
}

function generateRandomGraph(theme: string, numberOfNodes: number, numberOfTests: number): { nodes: Node[], links: Link[] } {
    const nodes: Node[] = [];
    const links: Link[] = [];

    // Generate POM Nodes
    for (let i = 0; i < numberOfNodes; i++) {
        nodes.push({
            id: uuidv4(),
            name: generateRandomName('POM', theme, i),
            type: 'POM',
            dependenciesCount: 0,
            dependentPOMs: [],
        });
    }

    // Generate Test Nodes and Links
    for (let i = 0; i < numberOfTests; i++) {
        const testNode: Node = {
            id: uuidv4(),
            name: generateRandomName('Test', theme, i),
            type: 'Test',
            dependenciesCount: 0,
            dependentPOMs: [],
        };
        nodes.push(testNode);

        // Randomly link tests to POMs
        const randomPOMIndex = Math.floor(Math.random() * numberOfNodes);
        links.push({ source: testNode.id, target: nodes[randomPOMIndex].id, connections: links.length + 1 });
    }

    // Populate connections count and dependent POMs
    links.forEach(link => {
        const sourceNode = nodes.find(node => node.id === link.source);
        if (sourceNode) {
            sourceNode.dependentPOMs.push(link.target);
        }
    });

    nodes.forEach(node => {
        if (node.type === 'POM') {
            node.dependenciesCount = links.filter(link => link.target === node.id).length;
        }
    });

    return { nodes, links };
}



// Writing JSON file
fs.writeFileSync(`${theme}_graphData.json`, JSON.stringify(graph, null, 2));

// Generating CSV for Playwright Tests
const csvLines = ['Test Name, Dependencies, Actions'];
graph.nodes.filter(node => node.type === 'Test').forEach(testNode => {
    const dependencies = testNode.dependentPOMs.join(';');
    const actions = testNode.name.split('_')[1];
    csvLines.push(`${testNode.name},${dependencies},${actions}`);
});
fs.writeFileSync(`${theme}_tests.csv`, csvLines.join('\n'));
