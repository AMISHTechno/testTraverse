import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { DependencyGraph } from './DependencyGraph'; // Update the import path as needed

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Instance of DependencyGraph
const dependencyGraph = new DependencyGraph();

// POST route to process folder structure
app.post('/api/process-folder', async (req: Request, res: Response) => {
    try {
        const folderStructure = req.body; // Assuming folder structure in JSON format
        // Process the folder structure
        // Adapt this to fit how DependencyGraph processes the folder structure
        const report = dependencyGraph.processFolderStructure(folderStructure);
        res.status(200).json(report);
    } catch (error) {
        console.error('Error processing folder:', error);
        res.status(500).send('Error processing folder');
    }
});

// GET route to fetch processed data
app.get('/api/get-report', (req: Request, res: Response) => {
    try {
        const report = dependencyGraph.getReport(); // Method to retrieve the report
        res.status(200).json(report);
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).send('Error fetching report');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
