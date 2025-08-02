import * as assert from 'assert';
import * as vscode from 'vscode';

// Performance and edge case tests
suite('Performance and Edge Cases', () => {
	
	test('Extension activation should be fast', async () => {
		const extension = vscode.extensions.getExtension('local-dev.markdown-auto-preview-toggle');
		assert.ok(extension, 'Extension should exist');
		
		const startTime = Date.now();
		
		if (!extension.isActive) {
			await extension.activate();
		}
		
		const activationTime = Date.now() - startTime;
		assert.ok(activationTime < 1000, `Extension activation should be under 1000ms, was ${activationTime}ms`);
	});

	test('Should handle rapid toggle operations', async () => {
		// Perform rapid toggles - should not crash
		try {
			for (let i = 0; i < 5; i++) {
				await vscode.commands.executeCommand('markdown-auto-preview-toggle.toggle');
				await new Promise(resolve => setTimeout(resolve, 10)); // Small delay
			}
			assert.ok(true, 'Rapid toggles completed without error');
		} catch (error) {
			assert.fail(`Rapid toggle failed: ${error}`);
		}
	});

	test('Should handle command execution performance', async () => {
		// Test command execution time
		const startTime = Date.now();
		await vscode.commands.executeCommand('markdown-auto-preview-toggle.toggle');
		const executionTime = Date.now() - startTime;
		
		assert.ok(executionTime < 500, `Command execution should be fast, was ${executionTime}ms`);
	});

	test('Memory usage should be stable after multiple operations', async () => {
		// This is a basic test - in a real scenario you'd use memory profiling tools
		const initialMemory = process.memoryUsage();
		
		// Perform many operations
		try {
			for (let i = 0; i < 20; i++) {
				await vscode.commands.executeCommand('markdown-auto-preview-toggle.toggle');
				if (i % 5 === 0) {
					// Force garbage collection opportunity
					await new Promise(resolve => setTimeout(resolve, 10));
				}
			}
			
			const finalMemory = process.memoryUsage();
			const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
			
			// Memory increase should be reasonable (less than 5MB for this test)
			assert.ok(memoryIncrease < 5 * 1024 * 1024, `Memory increase should be reasonable, was ${memoryIncrease} bytes`);
		} catch (error) {
			assert.fail(`Memory test failed: ${error}`);
		}
	});

	test('Should handle concurrent command execution', async () => {
		// Test that concurrent executions don't cause issues
		try {
			const promises = [];
			for (let i = 0; i < 3; i++) {
				promises.push(vscode.commands.executeCommand('markdown-auto-preview-toggle.toggle'));
			}
			await Promise.all(promises);
			assert.ok(true, 'Concurrent executions completed successfully');
		} catch (error) {
			assert.fail(`Concurrent execution failed: ${error}`);
		}
	});
});
