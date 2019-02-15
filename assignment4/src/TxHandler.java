import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class TxHandler {
	private UTXOPool utxoPool;

	/* Creates a public ledger whose current UTXOPool (collection of unspent 
	 * transaction outputs) is utxoPool. This should make a defensive copy of 
	 * utxoPool by using the UTXOPool(UTXOPool uPool) constructor.
	 */
	public TxHandler(UTXOPool utxoPool) {
		this.utxoPool = utxoPool;
	}

	/* Returns true if 
	 * (1) all outputs claimed by tx are in the current UTXO pool, 
	 * (2) the signatures on each input of tx are valid, 
	 * (3) no UTXO is claimed multiple times by tx, 
	 * (4) all of tx’s output values are non-negative, and
	 * (5) the sum of tx’s input values is greater than or equal to the sum of   
	        its output values;
	   and false otherwise.
	 */

	public boolean isValidTx(Transaction tx) {
		UTXOPool newPool = new UTXOPool();
		double inputTotal = 0;
		double outputTotal = 0;

		for (int i = 0; i < tx.numInputs(); i++) {
			Transaction.Input input = tx.getInput(i);
			UTXO utxo = new UTXO(input.prevTxHash, input.outputIndex);
			// Check 1
			if (!utxoPool.contains(utxo)) return false;
			// Check 2
			Transaction.Output output = utxoPool.getTxOutput(utxo);
			byte[] rawMessage = tx.getRawDataToSign(i);
			if (!output.address.verifySignature(rawMessage ,input.signature)) return false;
			// Check 3
			if (newPool.contains(utxo)) return false;
			newPool.addUTXO(utxo, output);
			// Check 5
			inputTotal += output.value;
		}

		// Check 4
		for (Transaction.Output o : tx.getOutputs()) {
			if (o.value < 0) return false;
			outputTotal += o.value;
		}

		return (inputTotal >= outputTotal);
	}

	/* Handles each epoch by receiving an unordered array of proposed 
	 * transactions, checking each transaction for correctness, 
	 * returning a mutually valid array of accepted transactions, 
	 * and updating the current UTXO pool as appropriate.
	 */
	public Transaction[] handleTxs(Transaction[] possibleTxs) {
		ArrayList<Transaction> validTransactions = new ArrayList<>();

		for (Transaction tx: possibleTxs) {
			if (!this.isValidTx(tx)) continue;
			validTransactions.add(tx);

			for (Transaction.Input input : tx.getInputs()) {
				UTXO utxo = new UTXO(input.prevTxHash, input.outputIndex);
				utxoPool.removeUTXO(utxo);
			}

			for (int i = 0; i < tx.numOutputs(); i++) {
				UTXO utxo = new UTXO(tx.getHash(), i);
				utxoPool.addUTXO(utxo, tx.getOutput(i));
			}
		}

		Transaction[] txArray = new Transaction[validTransactions.size()];
		return validTransactions.toArray(txArray);
	}
}
