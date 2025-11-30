# Quantum4J: A Modern Java Quantum Computing SDK  
**Lightweight • Extensible • JVM-Native • Engineering-First**

![Build](https://github.com/quantum4j/quantum4j/actions/workflows/maven.yml/badge.svg)
![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)
![Java](https://img.shields.io/badge/Java-17%2B-blue)
![Stars](https://img.shields.io/github/stars/quantum4j/quantum4j.svg?style=flat)

---

Quantum4J is a modern, modular, and fully JVM-native quantum computing SDK designed to bring  
**Quantum Software Engineering (QSE)** into the Java ecosystem.

While most quantum tools today focus on research workflows inside notebooks, Quantum4J is built for the  
**next phase of quantum evolution** — integrating quantum logic into real software systems, microservices,  
enterprise pipelines, CI/CD, and cloud environments.

Quantum4J is:

- A **clean quantum circuit API** for engineers  
- A **deterministic statevector simulator**  
- A **QASM-compatible** execution model  
- A **JVM-first architecture** ready for enterprise use  
- A **foundation** for future quantum engineering tools (testing, orchestration, cloud execution)

Quantum4J is **100% open-source**, **dependency-free**, and currently runs circuits up to ~**25 qubits** (memory bound).

---

# 🚀 Why Quantum4J?

Modern quantum development is dominated by research tools.  
Quantum4J instead focuses on **engineering requirements**:

- Deterministic, testable simulation  
- Clean modular API and package structure  
- Version-controlled quantum circuits in normal code repos  
- Backend-agnostic QASM export  
- JVM-native integration (Java, Kotlin, Scala)  
- Ready for microservices, cloud deployment, and CI/CD pipelines  
- A foundation for future orchestration, debugging, and test frameworks

Quantum4J aims to become the **engineering layer** of the quantum software stack — the place where quantum meets real-world systems.

---

# ✨ Features

## ✔ Full Standard Gate Set
- **Single-qubit:** X, Y, Z, H, S, T  
- **Rotation gates:** RX(θ), RY(θ), RZ(θ)  
- **Controlled gates:** CX, CZ, CH  
- **Two-qubit:** SWAP, iSWAP  
- **Three-qubit:** CCX (Toffoli)

## ✔ State-Vector Simulator
- High-performance N-qubit statevector backend  
- Supports 1-, 2-, and 3-qubit unitaries  
- Custom `Complex` math implementation  
- Deterministic and sample-based execution modes

## ✔ Measurements
- `measure(q, c)`  
- `measureAll()`  
- Classical registers  
- Deterministic or sampled measurement behavior

## ✔ OpenQASM Exporter
Export any circuit to **OpenQASM 2.0**:

```java
String qasm = QasmExporter.toQasm(circuit);
```

## ✔ Extensible Architecture
Create new gates with minimal boilerplate:

```java
class MyGate extends SingleQubitGate {
    // implement gate matrix and name
}
```

## ✔ Example Circuits + Test Suite
Includes reference circuits for:

- Bell state  
- GHZ state  
- Toffoli  
- SWAP / iSWAP  
- Rotation families  
- And more  

---

# 📦 Installation

## Maven (coming soon to Central)
```xml
<dependency>
    <groupId>io.github.quantum4j</groupId>
    <artifactId>quantum4j</artifactId>
    <version>1.2.0</version>
</dependency>
```

## Gradle
```gradle
implementation 'io.quantum4j:quantum4j:1.2.0'
```

## From Source
```bash
git clone https://github.com/quantum4j/quantum4j.git
```

---

# 🚀 Quick Start Example

### Create a Bell State

```java
import io.quantum4j.core.circuit.QuantumCircuit;
import io.quantum4j.core.backend.*;

public class BellState {
    public static void main(String[] args) {
        QuantumCircuit qc = QuantumCircuit.create(2)
                .h(0)
                .cx(0, 1)
                .measureAll();

        Result r = new StateVectorBackend().run(qc, RunOptions.shots(1000));
        System.out.println(r.getCounts());
    }
}
```

**Sample Output**
```
{00=502, 11=498}
```

---

# 🔺 Toffoli (CCX) Example

```java
QuantumCircuit qc = QuantumCircuit.create(3)
    .x(0)
    .x(1)
    .ccx(0, 1, 2)
    .measureAll();

Result r = backend.run(qc, RunOptions.shots(1000));
System.out.println(r.getCounts());
```

Expected:
```
{111=1000}
```

---

# 📤 Export to QASM

```java
QuantumCircuit qc = QuantumCircuit.create(2)
    .h(0)
    .cx(0, 1)
    .measureAll();

String qasm = QasmExporter.toQasm(qc);
System.out.println(qasm);
```

Output:

```
OPENQASM 2.0;
include "qelib1.inc";
qreg q[2];
creg c[2];

h q[0];
cx q[0], q[1];
measure q[0] -> c[0];
measure q[1] -> c[1];
```

---

# 🔗 Using Quantum4J in Spring Boot / REST APIs

Quantum4J is designed to fit naturally into backend systems and microservices.

Below is a minimal **Spring Boot** example:

```java
@RestController
@RequestMapping("/api/quantum")
public class QuantumController {

    private final StateVectorBackend backend = new StateVectorBackend();

    @GetMapping("/bell")
    public Map<String, Integer> bell() {
        QuantumCircuit qc = QuantumCircuit.create(2)
                .h(0)
                .cx(0, 1)
                .measureAll();

        Result result = backend.run(qc, RunOptions.shots(1000));
        return result.getCounts();
    }
}
```

---

# 🏗 Reference Architecture (Microservice)

```text
[Client / UI / Mobile]
            |
            |  REST
            v
   [Spring Boot Service]
            |
            |  Java API Calls
            v
      [Quantum4J Core]
            |
            |  QASM / Simulator API
            v
[Execution Layer: Local Sim, Cloud Sim, Hardware (future)]
```

---

# 🧱 Architecture Overview (Code-Level)

| Module     | Description                                       |
|------------|---------------------------------------------------|
| `circuit/` | Circuit objects, instructions, fluent builder     |
| `gates/`   | Gate definitions (1, 2, 3 qubit)                  |
| `math/`    | Complex arithmetic + state-vector implementation  |
| `backend/` | Execution backend (statevector simulator)         |
| `qasm/`    | QASM exporter                                     |
| `examples/`| Ready-to-run examples                             |
| `tests/`   | JUnit 5 test suite                                |

---

# 🧪 Test Suite

Run tests:
```bash
mvn test
```

---

# ⚡ Performance Notes

25 qubits is the upper bound on typical JVM memory.

---

# 🗺️ Roadmap

- U3/UGate  
- Controlled rotations  
- Grover's algorithm  
- Noise models  
- Density matrices  
- Hardware provider API  
- Cloud execution  

---

# 🧑‍💻 Contributing

We welcome:

- Pull requests  
- Issue reports  
- New gate implementations  
- Example circuits  
- Academic extensions  

Please use the **Google/IntelliJ Java style guide**.

---

# 📄 License

Apache License 2.0

---

# 🏢 Maintainer

**Vijay Anand Geddada**  
Creator – Quantum4J, mainMethod  
20+ years enterprise engineering leadership  
Cloud-native • Microservices • Java • Spring • AI • Quantum
# ⭐ Star the Repo

---
If you find this useful:

👉 https://github.com/quantum4j/quantum4j
