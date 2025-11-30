package io.quantum4j.tests;

import io.quantum4j.core.circuit.Instruction;
import io.quantum4j.core.circuit.QuantumCircuit;
import io.quantum4j.core.gates.StandardGates;
import io.quantum4j.transpile.PassManager;
import io.quantum4j.transpile.passes.SwapDecompositionPass;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SwapDecompositionPassTest {

    private QuantumCircuit run(QuantumCircuit circuit) {
        return new PassManager()
                .addPass(new SwapDecompositionPass())
                .run(circuit);
    }

    @Test
    void testSingleSwapDecomposesToThreeCX() {
        QuantumCircuit circuit = QuantumCircuit.create(2)
                .swap(0, 1);

        QuantumCircuit out = run(circuit);
        List<Instruction> inst = out.getInstructions();

        assertEquals(3, inst.size(), "SWAP should decompose into three CX gates");

        assertTrue(inst.get(0).getGate() instanceof StandardGates.CNOTGate);
        assertTrue(inst.get(1).getGate() instanceof StandardGates.CNOTGate);
        assertTrue(inst.get(2).getGate() instanceof StandardGates.CNOTGate);

        // CX(a,b), CX(b,a), CX(a,b)
        assertArrayEquals(new int[]{0, 1}, inst.get(0).getQubits());
        assertArrayEquals(new int[]{1, 0}, inst.get(1).getQubits());
        assertArrayEquals(new int[]{0, 1}, inst.get(2).getQubits());
    }

    @Test
    void testMultipleSwapsAndOtherGates() {
        QuantumCircuit circuit = QuantumCircuit.create(3)
                .h(0)
                .swap(0, 1)
                .z(2)
                .swap(1, 2);

        QuantumCircuit out = run(circuit);
        List<Instruction> inst = out.getInstructions();

        // h + (3 cx) + z + (3 cx) = 8 instructions
        assertEquals(8, inst.size());

        assertTrue(inst.get(0).getGate() instanceof StandardGates.HGate);
        assertTrue(inst.get(1).getGate() instanceof StandardGates.CNOTGate);
        assertTrue(inst.get(2).getGate() instanceof StandardGates.CNOTGate);
        assertTrue(inst.get(3).getGate() instanceof StandardGates.CNOTGate);
        assertTrue(inst.get(4).getGate() instanceof StandardGates.ZGate);
        assertTrue(inst.get(5).getGate() instanceof StandardGates.CNOTGate);
        assertTrue(inst.get(6).getGate() instanceof StandardGates.CNOTGate);
        assertTrue(inst.get(7).getGate() instanceof StandardGates.CNOTGate);

        // First swap(0,1) => (0,1), (1,0), (0,1)
        assertArrayEquals(new int[]{0, 1}, inst.get(1).getQubits());
        assertArrayEquals(new int[]{1, 0}, inst.get(2).getQubits());
        assertArrayEquals(new int[]{0, 1}, inst.get(3).getQubits());

        // Second swap(1,2) => (1,2), (2,1), (1,2)
        assertArrayEquals(new int[]{1, 2}, inst.get(5).getQubits());
        assertArrayEquals(new int[]{2, 1}, inst.get(6).getQubits());
        assertArrayEquals(new int[]{1, 2}, inst.get(7).getQubits());
    }

    @Test
    void testMeasurementsPreserved() {
        QuantumCircuit circuit = QuantumCircuit.create(2)
                .swap(0, 1)
                .measure(1, 0);

        QuantumCircuit out = run(circuit);
        List<Instruction> inst = out.getInstructions();

        // 3 CX + measure
        assertEquals(4, inst.size());
        assertEquals(Instruction.Type.MEASURE, inst.get(3).getType());
        assertEquals(1, inst.get(3).getQubits()[0]);
        assertEquals(0, inst.get(3).getClassicalBits()[0]);
    }
}

