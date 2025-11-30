package io.quantum4j.core.examples;

import io.quantum4j.core.backend.*;
import io.quantum4j.core.circuit.QuantumCircuit;
import io.quantum4j.transpile.PassManager;
import io.quantum4j.transpile.passes.CancelDoubleXPass;
import io.quantum4j.transpile.passes.SwapDecompositionPass;

public class TranspilerExample {

    public static void main(String[] args) {
        // Circuit: X(0); X(0); SWAP(0,1); measureAll();
        QuantumCircuit qc = QuantumCircuit.create(2)
                .x(0)
                .x(0)
                .swap(0, 1)
                .measureAll();

        System.out.println("Original instructions: " + qc.getInstructions().size());

        PassManager pm = new PassManager()
                .addPass(new CancelDoubleXPass())
                .addPass(new SwapDecompositionPass());

        QuantumCircuit optimized = pm.run(qc);

        System.out.println("Optimized instructions: " + optimized.getInstructions().size());

        Backend backend = new StateVectorBackend();
        Result r = backend.run(optimized, RunOptions.shots(1000));

        System.out.println("Counts (should still be 50/50 |0>, |1>): " + r.getCounts());
    }
}
